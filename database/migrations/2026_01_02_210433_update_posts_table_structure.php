<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->renameColumn('content', 'body_markdown');
            $table->renameColumn('thumbnail', 'cover_image_path');

            $table->text('excerpt')->nullable()->after('title');
            $table->longText('body_html')->nullable()->after('body_markdown'); // Will be empty initially
            $table->integer('reading_time')->nullable()->after('cover_image_path');
            $table->string('canonical_url')->nullable()->after('reading_time');
            $table->boolean('is_featured')->default(false)->after('published_at');
            $table->unsignedBigInteger('views_count')->default(0)->after('is_featured');
            $table->softDeletes()->after('updated_at');

            $table->dropColumn('og_data');

            $table->index('published_at');
            $table->index(['published_at', 'is_featured']);
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->renameColumn('body_markdown', 'content');
            $table->renameColumn('cover_image_path', 'thumbnail');

            $table->dropColumn([
                'excerpt',
                'body_html',
                'reading_time',
                'canonical_url',
                'is_featured',
                'views_count',
                'deleted_at',
            ]);

            $table->json('og_data')->nullable();
        });
    }
};
