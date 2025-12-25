<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Post;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'github_id',
        'username',
        'avatar_url',
        'github_avatar_url',
        'bio',
        'website_url',
        'social_links',
        'is_verified',
        'status',
        'is_admin',
        'github_token',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'social_links' => 'array',
            'is_verified' => 'boolean',
            'is_admin' => 'boolean',
        ];
    }

    public function getIsAdminAttribute($value)
    {
        return $value || $this->username === 'hadealahmad';
    }
    public function repos()
    {
        return $this->hasMany(Repo::class);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id');
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id');
    }

    public function scopeIsFollowing($query, int $user_id)
    {
        return $query->whereHas('following', function ($query) use ($user_id) {
            $query->where('following_id', $user_id);
        });
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likedPosts()
    {
        return $this->belongsToMany(Post::class, 'likes')->withTimestamps();
    }

    public function verifications()
    {
        return $this->hasMany(Verification::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
