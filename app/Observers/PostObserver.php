<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Str;

class PostObserver
{
    /**
     * Handle the Post "saving" event.
     * This runs BEFORE the post is written to the DB.
     */
    public function saving(Post $post): void
    {
        // Only run this heavy logic if the 'body_markdown' has actually changed
        if ($post->isDirty('body_markdown')) {
            // 1. Convert Markdown to HTML
            $post->body_html = Str::markdown($post->body_markdown);

            // 2. Generate Plain Text for calculations
            $plainText = strip_tags($post->body_html);

            // 3. Calculate Reading Time (Avg reading speed = 200 words/min)
            $wordCount = str_word_count($plainText);
            $post->reading_time = ceil($wordCount / 200);

            if (!$post->canonical_url) {
                $post->canonical_url = redirect()->route('posts.show', ['username' => $post->user->username, 'slug' => $post->slug])->getTargetUrl();
            }

            // 4. Create an automatic excerpt if one wasn't provided manually
            if (empty($post->excerpt)) {
                $post->excerpt = Str::limit($plainText, 160);
            }
        }
    }
}
