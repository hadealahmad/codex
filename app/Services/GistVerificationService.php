<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GistVerificationService
{
    /**
     * Find a Gist belonging to the user that contains the given token.
     *
     * @param User $user
     * @param string $token
     * @return string|null The URL of the matching Gist, or null if not found.
     */
    public function findVerificationGist(User $user, string $token): ?string
    {
        try {
            // Use user's GitHub token if available to increase rate limits and access secret gists if needed
            $headers = [
                'Accept' => 'application/vnd.github.v3+json',
            ];
            
            if ($user->github_token) {
                $headers['Authorization'] = 'Bearer ' . $user->github_token;
            }

            // Fetch user's gists (default sorts by created_at desc)
            $response = Http::withHeaders($headers)
                ->get("https://api.github.com/users/{$user->username}/gists", [
                    'per_page' => 10,
                ]);

            if ($response->failed()) {
                Log::error("Failed to fetch gists for user {$user->username}: " . $response->body());
                return null;
            }

            $gists = $response->json();

            foreach ($gists as $gist) {
                $files = $gist['files'] ?? [];
                
                foreach ($files as $file) {
                    $rawUrl = $file['raw_url'] ?? null;
                    if (!$rawUrl) continue;

                    // Fetch file content
                    $contentResponse = Http::get($rawUrl);
                    if ($contentResponse->successful()) {
                        $content = $contentResponse->body();
                        if (str_contains($content, $token)) {
                            return $gist['html_url'];
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            Log::error("GistVerificationService Exception: " . $e->getMessage());
        }

        return null;
    }
}
