<?php

namespace Tests\Unit;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class PostObserverTest extends TestCase
{
    use RefreshDatabase;

    public function test_saving_derives_html_reading_time_and_excerpt(): void
    {
        $user = User::create([
            'name' => 'Test',
            'username' => 'tester',
            'email' => 't@example.com',
            'password' => null,
        ]);

        $markdown = str_repeat('word ', 400); // 400 words -> 2 min read
        $post = $user->posts()->create([
            'title' => 'Hello World',
            'slug' => Str::slug('Hello World') . '-' . Str::random(6),
            'body_markdown' => "# Title\n" . $markdown,
        ]);

        $this->assertStringContainsString('<h1>', $post->body_html);
        $this->assertGreaterThanOrEqual(2, $post->reading_time);
        $this->assertNotEmpty($post->excerpt);
        $this->assertLessThanOrEqual(163, mb_strlen($post->excerpt));
        $this->assertStringContainsString('/u/tester/', $post->canonical_url);
    }

    public function test_excerpt_and_canonical_are_not_overwritten_when_provided(): void
    {
        $user = User::create([
            'name' => 'Test',
            'username' => 'tester2',
            'email' => 't2@example.com',
            'password' => null,
        ]);

        $post = $user->posts()->create([
            'title' => 'Custom',
            'slug' => 'custom-' . Str::random(6),
            'body_markdown' => str_repeat('word ', 300),
            'excerpt' => 'My custom excerpt',
            'canonical_url' => 'https://example.com/canonical',
        ]);

        $this->assertEquals('My custom excerpt', $post->excerpt);
        $this->assertEquals('https://example.com/canonical', $post->canonical_url);
    }
}
