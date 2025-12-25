<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserListingResource;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    protected $imageService;

    public function __construct(
        ImageService $imageService,
        public readonly UserRepository $userRepository
    ) {
        $this->imageService = $imageService;
    }

    public function show(Request $request, $username)
    {
        $user = User::where('username', $username)
            ->with([
                'repos' => fn ($q) => $q->latest(),
                'posts' => fn ($q) => $q->withCount('likes')
                    ->withExists(['likes as is_liked' => function ($query) {
                        $query->where('user_id', Auth::id());
                    }])
                    ->latest(),
            ])
            ->withCount(['followers', 'following', 'posts'])
            ->firstOrFail();

        $isFollowing = Auth::check()
            ? Auth::user()->following()->where('following_id', $user->id)->exists()
            : false;

        $featuredRepos = $user->repos()->where('is_featured', true)->latest()->take(3)->get();
        $latestPost = $user->posts()
            ->withCount('likes')
            ->withExists(['likes as is_liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->latest()
            ->first();

        return Inertia::render('Profile/Show', [
            'profile' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'avatar_url' => $user->avatar_url,
                'github_avatar_url' => $user->github_avatar_url,
                'bio' => $user->bio,
                'social_links' => $user->social_links ?? [],
                'is_verified' => $user->is_verified,
                'repos' => $user->repos,
                'posts' => $user->posts,
                'followers_count' => $user->followers_count,
                'following_count' => $user->following_count,
                'posts_count' => $user->posts_count,
                'is_following' => $isFollowing,
                'featured_repos' => $featuredRepos,
                'latest_post' => $latestPost,
            ],
            'activeTab' => $request->query('tab', 'repos'),
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:120',
            'avatar' => 'nullable|image|max:1024', // 1MB
            'avatar_url' => 'nullable|string|max:500',
            'social_links' => 'nullable|array|max:10',
            'social_links.*.platform' => 'required|string',
            'social_links.*.url' => 'required|string|max:500',
        ]);

        if ($request->hasFile('avatar')) {
            $path = $this->imageService->store(
                $request->file('avatar'),
                'avatars',
                80
            );
            $user->avatar_url = asset('storage/'.$path);
        } elseif ($request->filled('avatar_url')) {
            $user->avatar_url = $request->avatar_url;
        }

        $user->name = $validated['name'];
        $user->bio = $validated['bio'] ?? null;

        if ($request->has('social_links')) {
            $user->social_links = $validated['social_links'] ?? [];
        }

        $user->save();

        return back()->with('success', 'تم تحديث الملف الشخصي بنجاح');
    }

    public function revertAvatar()
    {
        $user = Auth::user();
        if ($user->github_avatar_url) {
            $user->update(['avatar_url' => $user->github_avatar_url]);

            return back()->with('success', 'تمت استعادة الصورة الرمزية من GitHub');
        }

        return back()->with('error', 'لا يوجد صورة رمزية سابقة من GitHub');
    }

    public function updateSocialLinks(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'social_links' => 'array|max:10',
            'social_links.*.platform' => 'required|string',
            'social_links.*.url' => 'required|string|max:500',
        ]);

        $user->social_links = $validated['social_links'];
        $user->save();

        return back()->with('success', 'تم تحديث روابط التواصل الاجتماعي');
    }

    public function downloadData()
    {
        $user = Auth::user()->load(['repos', 'posts', 'followers', 'following']);

        $data = [
            'user_info' => $user->toArray(),
            'repos' => $user->repos->toArray(),
            'posts' => $user->posts->toArray(),
            'followers' => $user->followers->pluck('username'),
            'following' => $user->following->pluck('username'),
            'exported_at' => now()->toIso8601String(),
        ];

        return response()->json($data, 200, [
            'Content-Disposition' => 'attachment; filename="codex_data_'.$user->username.'.json"',
        ]);
    }

    public function explore()
    {
        $users = $this->userRepository->filterForUser(null, [])->with(['following'])->paginate(10)->withQueryString();
        $usersCollection = UserListingResource::collection($users);


        $topRepos = \App\Models\Repo::where('is_own_repo', true)
            ->whereHas('user', function($q) {
                $q->where('is_verified', true);
            })
            ->orderBy('stars', 'desc')
            ->with('user')
            ->take(10)
            ->get();

        
        return Inertia::render('Users/List', [
            'users' => $usersCollection,
            'topRepos' => $topRepos,
        ]);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['nullable', 'current_password'],
        ]);

        $user = Auth::user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
