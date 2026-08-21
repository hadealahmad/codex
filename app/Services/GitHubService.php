<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GitHubService
{
    protected function client(?string $token = null): \Illuminate\Http\Client\PendingRequest
    {
        $headers = [
            'User-Agent' => 'Codex-App',
            'Accept' => 'application/vnd.github.v3+json',
        ];

        if ($token) {
            $headers['Authorization'] = 'token ' . $token;
        }

        return Http::withHeaders($headers);
    }

    /**
     * Fetch the authenticated user's public repos (first page of 100).
     */
    public function fetchUserRepos(string $token): ?array
    {
        $response = $this->client($token)->get('https://api.github.com/user/repos', [
            'type' => 'public',
            'per_page' => 100,
        ]);

        return $response->successful() ? $response->json() : null;
    }

    /**
     * Fetch the first 240 chars of a repo's README.
     */
    public function fetchReadmeExcerpt(string $token, string $owner, string $repo): ?string
    {
        $response = Http::withHeaders([
            'Authorization' => 'token ' . $token,
            'User-Agent' => 'Codex-App',
            'Accept' => 'application/vnd.github.raw',
        ])->get("https://api.github.com/repos/{$owner}/{$repo}/readme");

        return $response->successful() ? mb_substr($response->body(), 0, 240) : null;
    }

    /**
     * Fetch a single public repo's metadata.
     */
    public function fetchRepo(string $token, string $owner, string $repo): ?array
    {
        $response = $this->client($token)->get("https://api.github.com/repos/{$owner}/{$repo}");

        return $response->successful() ? $response->json() : null;
    }

    /**
     * Determine whether the given username owns or has commits in owner/repo.
     */
    public function checkContribution(string $token, string $owner, string $repo, string $username): bool
    {
        if (strcasecmp($owner, $username) === 0) {
            return true;
        }

        try {
            $response = $this->client($token)->get("https://api.github.com/repos/{$owner}/{$repo}/commits", [
                'author' => $username,
                'per_page' => 1,
            ]);

            if ($response->successful()) {
                return count($response->json()) > 0;
            }
        } catch (\Exception $e) {
            report($e);
        }

        return false;
    }
}
