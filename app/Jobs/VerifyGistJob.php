<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Verification;
use App\Services\GistVerificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class VerifyGistJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public User $user, public Verification $verification)
    {
    }

    public function handle(GistVerificationService $gistService): void
    {
        $foundGistUrl = $gistService->findVerificationGist($this->user, $this->verification->token);

        if ($foundGistUrl) {
            $this->user->update(['is_verified' => true]);
            $this->verification->update([
                'status' => 'approved',
                'gist_url' => $foundGistUrl,
            ]);

            return;
        }

        Log::info("Verification failed: token not found in any recent gist for user {$this->user->id}.");
    }
    public function failed(\Throwable $e): void
    {
        Log::error('VerifyGistJob permanently failed: ' . $e->getMessage());
    }
}
