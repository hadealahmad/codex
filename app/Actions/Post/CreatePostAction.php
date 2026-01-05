<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreatePostAction
{

    public function __construct(public ImageService $imageService) {
    }

    /**
     * Summary of execute
     * @param User $author
     * @param array $postData
     * @param UploadedFile|null $coverImage
     * @return Post
     */
    public function execute(User $author, array $postData, ?UploadedFile $coverImage = null): Post
    {
        return DB::transaction(function() use ($author, $postData, $coverImage) {
            $coverImagePath = $this->uploadImage($coverImage);

            $post = $author->posts()->create([
                'title' => $postData['title'],
                'slug' => $this->generateSlug($postData['title']),
                'body_markdown' => $postData['body_markdown'],
                'cover_image_path' => $coverImagePath,
                'excerpt' => $postData['excerpt'] ?? Str::limit($postData['body_markdown'], 160),
                'canonical_url' => $postData['canonical_url'] ?? null,
                'published_at' => $postData['published_at'] ?? now(),
            ]);

            return $post;
        });
    }

    private function generateSlug(string $title): string
    {
        return Str::slug($title) . '-' . Str::random(6);
    }

    private function uploadImage(?UploadedFile $coverImage = null): ?string
    {
        if (!$coverImage) {
            return null;
        }

        return $this->imageService->store($coverImage, 'thumbnails', 80);
    }


}