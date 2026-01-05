<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\FeedController::class, 'index'])->name('home');
Route::get('/feed', [\App\Http\Controllers\FeedController::class, 'index'])->name('feed');

Route::get('/auth/github/redirect', [AuthController::class, 'redirect'])->name('login');
Route::get('/auth/github/callback', [AuthController::class, 'callback']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/verification', [VerificationController::class, 'show'])->name('verification.show');
    Route::post('/verification', [VerificationController::class, 'store'])->name('verification.store');
    Route::post('/verification/scan', [VerificationController::class, 'checkGists'])->name('verification.scan');

    // Repositories
    Route::resource('repos', \App\Http\Controllers\RepoController::class)->only(['store', 'update', 'destroy']);
    Route::post('/repos/import', [\App\Http\Controllers\RepoController::class, 'import'])->name('repos.import');
    Route::post('/repos/{repo}/toggle-feature', [\App\Http\Controllers\RepoController::class, 'toggleFeature'])->name('repos.toggle-feature');
    Route::post('/repos/{repo}/refresh-verification', [\App\Http\Controllers\RepoController::class, 'refreshVerification'])->name('repos.refresh-verification');

    // Posts
    Route::get('/posts/create', [\App\Http\Controllers\PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [\App\Http\Controllers\PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [\App\Http\Controllers\PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [\App\Http\Controllers\PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [\App\Http\Controllers\PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('/posts/{post}/like', [\App\Http\Controllers\LikeController::class, 'toggle'])->name('posts.like');
    Route::post('/posts/{post}/comments', [\App\Http\Controllers\CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [\App\Http\Controllers\CommentController::class, 'destroy'])->name('comments.destroy');

    // Follows
    Route::post('/users/{user}/follow', [\App\Http\Controllers\FollowController::class, 'store'])->name('users.follow');

    // Notifications
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/recent', [\App\Http\Controllers\NotificationController::class, 'recent'])->name('notifications.recent');
    Route::post('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');

    // Profile Management
    Route::post('/profile/update', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/revert-avatar', [\App\Http\Controllers\ProfileController::class, 'revertAvatar'])->name('profile.revert-avatar');
    Route::post('/profile/social-links', [\App\Http\Controllers\ProfileController::class, 'updateSocialLinks'])->name('profile.social-links');
    Route::get('/profile/download-data', [\App\Http\Controllers\ProfileController::class, 'downloadData'])->name('profile.download-data');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\AdminController::class, 'index'])->name('dashboard');
    Route::post('/verifications/{id}/approve', [\App\Http\Controllers\AdminController::class, 'approveVerification'])->name('verifications.approve');
    Route::post('/verifications/{id}/reject', [\App\Http\Controllers\AdminController::class, 'rejectVerification'])->name('verifications.reject');

    Route::post('/users/{id}/verify', [\App\Http\Controllers\AdminController::class, 'verifyUser'])->name('users.verify');
    Route::post('/users/{id}/unverify', [\App\Http\Controllers\AdminController::class, 'unverifyUser'])->name('users.unverify');
    Route::post('/users/{id}/ban', [\App\Http\Controllers\AdminController::class, 'banUser'])->name('users.ban');
    Route::post('/users/{id}/unban', [\App\Http\Controllers\AdminController::class, 'unbanUser'])->name('users.unban');
    Route::delete('/users/{id}', [\App\Http\Controllers\AdminController::class, 'deleteUser'])->name('users.delete');
    Route::post('/users/bulk-action', [\App\Http\Controllers\AdminController::class, 'bulkAction'])->name('users.bulk-action');

    //    Route::get('/posts', [\App\Http\Controllers\AdminController::class, 'posts'])->name('posts');
    //    Route::delete('/posts/{id}', [\App\Http\Controllers\AdminController::class, 'deletePost'])->name('posts.delete');
    //
    Route::get('/repos', [\App\Http\Controllers\AdminController::class, 'repos'])->name('repos');
    Route::delete('/repos/{id}', [\App\Http\Controllers\AdminController::class, 'deleteRepo'])->name('repos.delete');
});

Route::get('/@{username}/repos', [\App\Http\Controllers\RepoController::class, 'userRepos'])->name('repos.user_repos');
Route::get('/@{username}/blog', [\App\Http\Controllers\PostController::class, 'userBlog'])->name('posts.user_blog');
Route::get('/@{username}', [\App\Http\Controllers\ProfileController::class, 'show'])->name('profile.show');
Route::get('/u/{username}/{slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');
Route::get('/u/explore', [\App\Http\Controllers\ProfileController::class, 'explore'])->name('users.explore');
