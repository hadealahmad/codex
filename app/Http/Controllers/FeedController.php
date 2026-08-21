<?php

namespace App\Http\Controllers;

use App\Services\FeedService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function __construct(protected FeedService $feedService)
    {
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $tab = $request->query('tab', 'global');

        // Preload following ids once to reuse across queries
        $followingIds = $user ? $user->following()->pluck('users.id') : collect();

        if ($tab === 'following' && !$user) {
            return redirect()->route('login');
        }

        $query = $this->feedService->feedQuery($user);

        if ($tab === 'following') {
            $query->whereIn('user_id', $followingIds->concat([$user->id]));
        }

        $posts = $query->latest()->paginate(10)->withQueryString();

        // Sidebar data - randomize on full reload, keep stable on follow actions
        $recommendedIds = $request->session()->get('feed_recommended_ids', []);
        $keepRecommendations = $request->boolean('keep_recommendations')
            || $request->session()->pull('feed_keep_recommendations', false);

        if (!$keepRecommendations || empty($recommendedIds) || !is_array($recommendedIds)) {
            $recommendedIds = $this->feedService->recommendedUsers($user, $followingIds)
                ->pluck('id')
                ->toArray();

            $request->session()->put('feed_recommended_ids', $recommendedIds);
        }

        // Always ensure session is saved
        $request->session()->save();

        $recommendedUsers = \App\Models\User::whereIn('id', $recommendedIds)
            ->withExists(['followers as is_following' => function ($q) use ($user) {
                $q->where('follower_id', $user?->id ?? 0);
            }])
            ->get()
            ->sortBy(fn ($u) => array_search($u->id, $recommendedIds))
            ->values();

        return Inertia::render('Feed', [
            'posts' => $posts,
            'tab' => $tab,
            'recommendedUsers' => $recommendedUsers,
            'topRepos' => $this->feedService->topRepos(),
        ]);
    }
}
