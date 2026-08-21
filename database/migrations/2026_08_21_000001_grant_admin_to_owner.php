<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\User;

return new class extends Migration
{
    public function up(): void
    {
        User::where('username', 'hadealahmad')->update(['is_admin' => true]);
    }

    public function down(): void
    {
        //
    }
};
