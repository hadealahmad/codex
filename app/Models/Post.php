<?php

namespace App\Models;

use App\Jobs\FetchOpenGraphData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'body_markdown',
        'cover_image_path',
        'excerpt',
        'canonical_url',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::created(function ($post) {
            FetchOpenGraphData::dispatch($post);
        });

        static::updated(function ($post) {
            if ($post->isDirty('content')) {
                FetchOpenGraphData::dispatch($post);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
}
