<?php

namespace App\Policies;

use App\Models\Repo;
use App\Models\User;

class RepoPolicy
{
    public function update(User $user, Repo $repo): bool
    {
        return $repo->user_id === $user->id;
    }

    public function delete(User $user, Repo $repo): bool
    {
        return $repo->user_id === $user->id;
    }
}
