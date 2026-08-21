<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $post->comments()->create([
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        return back()->with('success', 'تم إضافة التعليق بنجاح');
    }

    public function destroy(Request $request, Comment $comment)
    {
        if (!$request->user()->can('delete', $comment)) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'تم حذف التعليق');
    }
}
