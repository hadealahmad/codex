<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreatePostAction;
use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

use App\Services\ImageService;

class PostController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(StorePostRequest $request, CreatePostAction $createPostAction)
    {
        $post = $createPostAction->execute(
            Auth::user(),
            $request->validated(),
            $request->file('cover_image')
        );

        return redirect()->route('posts.show', ['username' => Auth::user()->username, 'slug' => $post->slug]);
    }

    public function show($username, $slug, Request $request)
    {
        $post = Post::where('slug', $slug)
            ->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })
            ->with(['user', 'comments.user'])
            ->withCount('likes')
            ->withExists(['likes as is_liked' => function($query) {
                $query->where('user_id', Auth::id());
            }])
            ->firstOrFail();

        $viewed = $request->session()->get('viewed_posts', []);
        if (!in_array($post->id, $viewed)) {
            $post->increment('views_count');
            $request->session()->put('viewed_posts', array_merge($viewed, [$post->id]));
        }

        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    public function userBlog($username)
    {
        $user = User::where('username', $username)->firstOrFail();

        $posts = $user->posts()
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Posts/UserBlog', [
            'user' => $user,
            'posts' => $posts
        ]);
    }

    public function edit(Request $request, Post $post)
    {
        if (!$request->user()->can('update', $post)) {
            abort(403);
        }

        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        if (!$request->user()->can('update', $post)) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'body_markdown' => 'required|string|min:10',
            'cover_image' => 'nullable|image|max:512',
            'excerpt' => 'nullable|string|max:160',
            'canonical_url' => 'nullable|url|max:255',
        ]);

        if ($request->hasFile('cover_image')) {
            $thumbnailPath = $this->imageService->store(
                $request->file('cover_image'),
                'thumbnails',
                80
            );
            $post->cover_image_path = $thumbnailPath;
        }

        $post->title = $request->title;
        $post->body_markdown = $request->body_markdown;
        if ($request->filled('excerpt')) {
            $post->excerpt = $request->excerpt;
        }
        if ($request->has('canonical_url')) {
            $post->canonical_url = $request->canonical_url;
        }
        $post->save();

        return redirect()->route('posts.show', ['username' => Auth::user()->username, 'slug' => $post->slug]);
    }

    public function destroy(Request $request, Post $post)
    {
        if (!$request->user()->can('delete', $post)) {
            abort(403);
        }

        $post->delete();

        return redirect()->route('profile.show', Auth::user()->username);
    }
}
