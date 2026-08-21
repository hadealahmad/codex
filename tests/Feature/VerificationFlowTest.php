<?php

namespace Tests\Feature;

use App\Jobs\VerifyGistJob;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Tests\TestCase;

class VerificationFlowTest extends TestCase
{
    use RefreshDatabase;

    private function createUser(): User
    {
        return User::create([
            'name' => 'Test',
            'username' => 'tester' . uniqid(),
            'email' => uniqid() . '@example.com',
            'password' => null,
        ]);
    }

    public function test_show_creates_pending_verification_with_token(): void
    {
        $user = $this->createUser();

        $this->actingAs($user)->get('/verification')->assertOk();

        $verification = Verification::where('user_id', $user->id)->first();
        $this->assertNotNull($verification);
        $this->assertEquals('pending', $verification->status);
        $this->assertStringStartsWith('verify-codex-', $verification->token);
    }

    public function test_store_validates_gist_url_and_dispatches_job(): void
    {
        Bus::fake();
        $user = $this->createUser();
        Verification::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'token' => 'verify-codex-' . Str::random(12),
            'gist_url' => '',
        ]);

        $this->actingAs($user)
            ->post('/verification', ['gist_url' => 'https://evil.com/x'])
            ->assertSessionHasErrors('gist_url');

        Bus::assertNothingDispatched();

        $this->actingAs($user)
            ->post('/verification', ['gist_url' => 'https://gist.github.com/user/abc123'])
            ->assertSessionHasNoErrors();

        Bus::assertDispatched(VerifyGistJob::class);
    }

    public function test_scan_approves_user_when_token_found_in_gist(): void
    {
        Http::fake([
            'api.github.com/users/*/gists*' => Http::response([
                ['html_url' => 'https://gist.github.com/user/abc123', 'files' => ['proof.txt' => ['raw_url' => 'https://gist.githubusercontent.com/raw/1']]],
            ]),
            'gist.githubusercontent.com/*' => Http::response('some text verify-codex-abc123'),
        ]);

        $user = $this->createUser();
        $verification = Verification::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'token' => 'verify-codex-abc123',
            'gist_url' => '',
        ]);

        $this->actingAs($user)->post('/verification/scan')->assertRedirect();

        $this->assertTrue($user->fresh()->is_verified);
        $this->assertEquals('approved', $verification->fresh()->status);
    }

    public function test_scan_rejects_when_token_not_found(): void
    {
        Http::fake([
            'api.github.com/users/*/gists*' => Http::response([
                ['html_url' => 'https://gist.github.com/user/abc123', 'files' => ['proof.txt' => ['raw_url' => 'https://gist.githubusercontent.com/raw/1']]],
            ]),
            'gist.githubusercontent.com/*' => Http::response('nothing here'),
        ]);

        $user = $this->createUser();
        $verification = Verification::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'token' => 'verify-codex-abc123',
            'gist_url' => '',
        ]);

        $this->actingAs($user)->post('/verification/scan')->assertRedirect();

        $this->assertFalse($user->fresh()->is_verified);
        $this->assertEquals('pending', $verification->fresh()->status);
    }
}
