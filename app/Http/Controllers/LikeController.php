<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $user = Auth::user();

        $attached = $user->likedPosts()->syncWithoutDetaching([$post->id])['attached'] === [$post->id];

        if ($attached) {
            return back();
        }

        $user->likedPosts()->detach($post->id);

        return back();
    }
}
