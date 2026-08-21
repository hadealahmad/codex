<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BanMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    private function createUser(array $overrides = []): User
    {
        return User::create(array_merge([
            'name' => 'Test',
            'username' => 'tester' . uniqid(),
            'email' => uniqid() . '@example.com',
            'password' => null,
        ], $overrides));
    }

    public function test_banned_user_is_logged_out_and_redirected(): void
    {
        $user = $this->createUser(['status' => 'banned']);

        $this->actingAs($user)
            ->get('/posts/create')
            ->assertRedirect('/')
            ->assertSessionHas('error');

        $this->assertGuest();
    }

    public function test_active_user_can_access_protected_pages(): void
    {
        $user = $this->createUser(['status' => 'active']);

        $this->actingAs($user)
            ->get('/notifications')
            ->assertOk();
    }
}
