<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class PostAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private function createUser(string $username): User
    {
        return User::create([
            'name' => ucfirst($username),
            'username' => $username,
            'email' => $username . '@example.com',
            'password' => null,
        ]);
    }

    private function createPost(User $user): Post
    {
        return $user->posts()->create([
            'title' => 'A Title',
            'slug' => Str::slug('A Title') . '-' . Str::random(6),
            'body_markdown' => str_repeat('word ', 50),
        ]);
    }

    public function test_owner_can_update_post(): void
    {
        $user = $this->createUser('owner');
        $post = $this->createPost($user);

        $this->actingAs($user)
            ->put("/posts/{$post->id}", ['title' => 'New Title', 'body_markdown' => str_repeat('word ', 20)])
            ->assertRedirect();

        $this->assertEquals('New Title', $post->fresh()->title);
    }

    public function test_non_owner_cannot_update_or_delete_post(): void
    {
        $owner = $this->createUser('owner');
        $other = $this->createUser('other');
        $post = $this->createPost($owner);

        $this->actingAs($other)
            ->put("/posts/{$post->id}", ['title' => 'Hacked', 'body_markdown' => str_repeat('word ', 20)])
            ->assertForbidden();

        $this->actingAs($other)
            ->delete("/posts/{$post->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('posts', ['id' => $post->id, 'title' => 'A Title']);
    }

    public function test_admin_can_delete_any_post(): void
    {
        $owner = $this->createUser('owner');
        $admin = $this->createUser('admin');
        $admin->update(['is_admin' => true]);
        $post = $this->createPost($owner);

        $this->actingAs($admin)
            ->delete("/posts/{$post->id}")
            ->assertRedirect();

        $this->assertSoftDeleted('posts', ['id' => $post->id]);
    }

    public function test_guest_cannot_create_post(): void
    {
        $this->get('/posts/create')->assertRedirect('/auth/github/redirect');
        $this->post('/posts', [])->assertRedirect('/auth/github/redirect');
    }
}
