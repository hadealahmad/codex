<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class MigratePosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        Post::chunk(100, function ($posts) {
            foreach ($posts as $post) {
                // 1. Convert Markdown to HTML
                $post->body_html = Str::markdown($post->body_markdown);

                // 2. Calculate Reading Time (rough estimate: 200 words per minute)
                $wordCount = str_word_count(strip_tags($post->body_html));
                $post->reading_time = ceil($wordCount / 200);

                // 3. Generate Excerpt (first 150 chars of plain text)
                $post->excerpt = Str::limit(strip_tags($post->body_html), 150);

                $post->save();
            }
        });
    }
}
