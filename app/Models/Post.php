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
        'og_data',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'og_data' => 'array',
    ];

    protected $appends = [
        'content',
        'thumbnail',
    ];

    protected static function booted()
    {
        static::created(function ($post) {
            FetchOpenGraphData::dispatch($post);
        });

        static::updated(function ($post) {
            if ($post->isDirty('body_markdown')) {
                FetchOpenGraphData::dispatch($post);
            }
        });
    }

    public function getCoverImagePathAttribute($value)
    {
        if (!$value) {
            return null;
        }

        if (str_starts_with($value, 'http')) {
            return $value;
        }

        return asset('storage/' . $value);
    }

    // Compatibility accessors for old frontend field names
    public function getContentAttribute()
    {
        return $this->body_markdown;
    }

    public function getThumbnailAttribute()
    {
        return $this->cover_image_path;
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
