<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

enum SortDirection: string
{
    case ASC = 'asc';
    case DESC = 'desc';
}
class UserRepository
{
    public function filterForUser(?User $user = null, array $filters = []): Builder
    {
        $query = User::query();

        if (isset($filters['verified'])) {
            $query->where('is_verified', $filters['verified']);
        }

        if (isset($filters['sortBy']) && isset($filters['sortDirection'])) {
            $query = $this->sortBy($query, $filters['sortBy'], $filters['sortDirection']);
        }

        return $query;
    }

    private function sortBy(Builder $query, string $key, SortDirection $direction = SortDirection::ASC): Builder
    {
        return $query->orderBy($key, $direction->value);
    }
}
