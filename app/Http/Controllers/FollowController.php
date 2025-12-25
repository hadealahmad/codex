<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\NewFollower;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function store(Request $request, User $user)
    {
        $authUser = Auth::user();

        if ($authUser->id === $user->id) {
            return back();
        }

        if ($authUser->following()->where('following_id', $user->id)->exists()) {
            $authUser->following()->detach($user->id);
        } else {
            $authUser->following()->attach($user->id);
            $user->notify(new NewFollower($authUser));
        }

        // Keep sidebar recommendations stable after follow/unfollow to allow immediate undo
        $request->session()->put('feed_keep_recommendations', true);

        return back();
    }
}
