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
    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user')
                ->latest()
                ->paginate(10)
        ]);
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

    public function show($username, $slug)
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

    public function edit(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
            'thumbnail' => 'nullable|image|max:512', // 512KB max
        ]);



        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $this->imageService->store(
                $request->file('thumbnail'),
                'thumbnails',
                80
            );
            $post->cover_image_path = $thumbnailPath;
        }

        $post->title = $request->title;
        $post->body_markdown = $request->content;
        $post->save();

        return redirect()->route('posts.show', ['username' => Auth::user()->username, 'slug' => $post->slug]);
    }

    public function destroy(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }

        $post->delete();

        return redirect()->route('profile.show', Auth::user()->username);
    }
}
