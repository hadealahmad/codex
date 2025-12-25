<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $tab = $request->query('tab', 'global');

        // Preload following ids once to reuse across queries
        $followingIds = $user ? $user->following()->pluck('users.id') : collect();

        if ($tab === 'following' && !$user) {
            return redirect()->route('login');
        }

        $query = Post::with(['user' => function($q) use ($user) {
                $q->withExists(['followers as is_following' => function($fq) use ($user) {
                    $fq->where('follower_id', $user ? $user->id : 0);
                }]);
            }])
            ->withCount('likes')
            ->withExists(['likes as is_liked' => function($q) use ($user) {
                $q->where('user_id', $user ? $user->id : 0);
            }]);

        if ($tab === 'following') {
            $query->whereIn('user_id', $followingIds->concat([$user->id]));
        }

        $posts = $query->latest()->paginate(10)->withQueryString();

        // Sidebar data - randomize on full reload, keep stable on follow actions
        $recommendedIds = $request->session()->get('feed_recommended_ids', []);
        $keepRecommendations = $request->boolean('keep_recommendations')
            || $request->session()->pull('feed_keep_recommendations', false);

        $shouldRegenerate = !$keepRecommendations || empty($recommendedIds) || !is_array($recommendedIds);

        if ($shouldRegenerate) {
            $recommendedIds = \App\Models\User::where('is_verified', true)
                ->where('id', '!=', $user ? $user->id : 0)
                ->when($followingIds->isNotEmpty(), function($q) use ($followingIds) {
                    $q->whereNotIn('id', $followingIds);
                })
                ->inRandomOrder()
                ->take(5)
                ->pluck('id')
                ->toArray();

            $request->session()->put('feed_recommended_ids', $recommendedIds);
        }

        // Always ensure session is saved
        $request->session()->save();

        $recommendedUsers = \App\Models\User::whereIn('id', $recommendedIds)
            ->withExists(['followers as is_following' => function($q) use ($user) {
                $q->where('follower_id', $user ? $user->id : 0);
            }])
            ->get()
            ->sortBy(function($u) use ($recommendedIds) {
                return array_search($u->id, $recommendedIds);
            })
            ->values();

        $topRepos = \App\Models\Repo::where('is_own_repo', true)
            ->whereHas('user', function($q) {
                $q->where('is_verified', true);
            })
            ->orderBy('stars', 'desc')
            ->with('user')
            ->take(10)
            ->get();

        return Inertia::render('Feed', [
            'posts' => $posts,
            'tab' => $tab,
            'recommendedUsers' => $recommendedUsers,
            'topRepos' => $topRepos,
        ]);
    }
}
