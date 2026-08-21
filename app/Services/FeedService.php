<?php

namespace App\Services;

use App\Models\Post;
use App\Models\Repo;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Collection;

class FeedService
{
    /**
     * Recommended verified users, stable across follow actions via session.
     *
     * @return Collection<int, User>
     */
    public function recommendedUsers(?Authenticatable $user, Collection $followingIds): Collection
    {
        return User::where('is_verified', true)
            ->where('id', '!=', $user?->id ?? 0)
            ->when($followingIds->isNotEmpty(), function ($q) use ($followingIds) {
                $q->whereNotIn('id', $followingIds);
            })
            ->inRandomOrder()
            ->take(5)
            ->get();
    }

    /**
     * Top starred own-repos from verified users.
     *
     * @return Collection<int, Repo>
     */
    public function topRepos(): Collection
    {
        return Repo::where('is_own_repo', true)
            ->whereHas('user', fn ($q) => $q->where('is_verified', true))
            ->orderBy('stars', 'desc')
            ->with('user')
            ->take(10)
            ->get();
    }

    /**
     * Base feed query with like counts and per-user flags.
     */
    public function feedQuery(?Authenticatable $user): \Illuminate\Database\Eloquent\Builder
    {
        return Post::with(['user' => function ($q) use ($user) {
                $q->withExists(['followers as is_following' => function ($fq) use ($user) {
                    $fq->where('follower_id', $user?->id ?? 0);
                }]);
            }])
            ->withCount('likes')
            ->withExists(['likes as is_liked' => function ($q) use ($user) {
                $q->where('user_id', $user?->id ?? 0);
            }]);
    }
}
