<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\GitHubService;
use Illuminate\Support\Facades\Log;

class ImportGithubRepos implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;
    public int $timeout = 600;

    public function __construct(public User $user)
    {
    }

    public function handle(GitHubService $github): void
    {
        $repos = $github->fetchUserRepos($this->user->github_token);

        if ($repos === null) {
            Log::error("Repo import failed for user {$this->user->id}");
            return;
        }

        foreach ($repos as $repoData) {
            // Skip the Codex app repo itself, or already-imported repos
            if (strcasecmp($repoData['owner']['login'], $this->user->username) === 0 && $repoData['name'] === 'codex') {
                continue;
            }
            if ($this->user->repos()->where('github_repo_id', $repoData['id'])->exists()) {
                continue;
            }

            $readmeContent = $github->fetchReadmeExcerpt(
                $this->user->github_token,
                $repoData['owner']['login'],
                $repoData['name']
            );

            $this->user->repos()->create([
                'github_repo_id' => $repoData['id'],
                'name' => $repoData['name'],
                'description' => $repoData['description'],
                'url' => $repoData['html_url'],
                'language' => $repoData['language'],
                'stars' => $repoData['stargazers_count'],
                'user_notes' => $readmeContent ?: null,
                // Only the user's own repos, not repos they collaborate on
                'is_own_repo' => strcasecmp($repoData['owner']['login'], $this->user->username) === 0,
            ]);
        }
    }
    public function failed(\Throwable $e): void
    {
        Log::error('ImportGithubRepos permanently failed: ' . $e->getMessage());
    }
}
