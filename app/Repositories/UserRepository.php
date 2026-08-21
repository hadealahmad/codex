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
    private const SORTABLE_COLUMNS = ['name', 'username', 'created_at', 'is_verified'];

    public function filterForUser(?User $user = null, array $filters = []): Builder
    {
        $query = User::query();

        if (isset($filters['verified'])) {
            $query->where('is_verified', $filters['verified']);
        }

        if (isset($filters['sortBy']) && isset($filters['sortDirection'])) {
            $direction = SortDirection::tryFrom(strtolower((string) $filters['sortDirection'])) ?? SortDirection::ASC;
            $query = $this->sortBy($query, $filters['sortBy'], $direction);
        }

        return $query;
    }

    private function sortBy(Builder $query, string $key, SortDirection $direction = SortDirection::ASC): Builder
    {
        if (!in_array($key, self::SORTABLE_COLUMNS, true)) {
            return $query;
        }

        return $query->orderBy($key, $direction->value);
    }
}
