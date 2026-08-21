<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchOpenGraphData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Post $post)
    {
        //
    }

    public function handle(): void
    {
        // Find first URL in content
        preg_match('/https?:\/\/[^\s]+/', $this->post->content, $matches);
        
        if (empty($matches)) {
            return;
        }

        $url = $matches[0];

        if (!$this->isSafeUrl($url)) {
            return;
        }

        try {
            $response = Http::timeout(5)->get($url);
            
            if ($response->failed()) {
                return;
            }

            $html = $response->body();
            
            $ogData = [
                'url' => $url,
                'title' => $this->getMetaTag($html, 'og:title'),
                'description' => $this->getMetaTag($html, 'og:description'),
                'image' => $this->getMetaTag($html, 'og:image'),
            ];

            // Clean up if empty
            if (empty($ogData['title'])) {
                // Fallback to <title>
                preg_match('/<title>(.*?)<\/title>/', $html, $titleMatches);
                $ogData['title'] = $titleMatches[1] ?? '';
            }

            if (!empty($ogData['title']) || !empty($ogData['image'])) {
                $this->post->update(['og_data' => $ogData]);
            }

        } catch (\Exception $e) {
            Log::error("OG Fetch failed for post {$this->post->id}: " . $e->getMessage());
        }
    }

    private function isSafeUrl(string $url): bool
    {
        $parts = parse_url($url);

        if (!$parts || !in_array($parts['scheme'] ?? '', ['http', 'https'], true) || empty($parts['host'])) {
            return false;
        }

        $ip = gethostbyname($parts['host']);

        if ($ip === $parts['host']) {
            return false;
        }

        return (bool) filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
    }

    private function getMetaTag($html, $property)
    {
        preg_match('/<meta[^>]+property="' . preg_quote($property, '/') . '"[^>]+content="([^"]+)"/i', $html, $matches);
        if (isset($matches[1])) {
            return $matches[1];
        }
        
        // Try name attribute as fallback
        preg_match('/<meta[^>]+name="' . preg_quote($property, '/') . '"[^>]+content="([^"]+)"/i', $html, $matches);
        return $matches[1] ?? null;
    }
    public function failed(\Throwable $e): void
    {
        Log::error('FetchOpenGraphData permanently failed: ' . $e->getMessage());
    }
}
