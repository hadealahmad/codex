<?php

namespace App\Http\Controllers;

use App\Models\Repo;
use App\Services\GitHubService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RepoController extends Controller
{
    public function __construct(protected GitHubService $github)
    {
    }

    private function parseRepoUrl(string $url): ?array
    {
        $parts = explode('/', parse_url($url, PHP_URL_PATH) ?? '');
        if (count($parts) < 3 || $parts[1] === '' || $parts[2] === '') {
            return null;
        }

        return [$parts[1], $parts[2]];
    }

    public function userRepos(Request $request, $username)
    {
        $user = \App\Models\User::where('username', $username)->firstOrFail();

        $query = $user->repos();

        // Filter by language
        if ($request->has('language') && $request->language !== 'all') {
            $query->where('language', $request->language);
        }

        // Filter by folder
        if ($request->has('folder') && $request->folder !== 'all') {
            $query->where('folder', $request->folder);
        }

        // Sorting
        $sortKey = $request->input('sort', 'stars'); // default to start
        $sortDir = $request->input('direction', 'desc');

        if (in_array($sortKey, ['name', 'stars', 'language'])) {
            $query->orderBy($sortKey, $sortDir);
        } else {
             $query->latest();
        }

        $repos = $query->paginate(20)->withQueryString();
        
        // Get all unique languages and folders for filter dropdowns
        $languages = $user->repos()->select('language')->distinct()->pluck('language')->filter()->values();
        $folders = $user->repos()->select('folder')->distinct()->pluck('folder')->filter()->values();

        return \Inertia\Inertia::render('Repos/UserRepos', [
            'user' => $user,
            'repos' => $repos,
            'filters' => [
                'language' => $request->language,
                'folder' => $request->folder,
                'sort' => $sortKey,
                'direction' => $sortDir,
            ],
            'availableLanguages' => $languages,
            'availableFolders' => $folders,
        ]);
    }

    public function import()
    {
        $user = Auth::user();

        if (!$user->github_token) {
            return back()->with('error', 'انتهت صلاحية جلسة GitHub. يرجى تسجيل الدخول مرة أخرى.');
        }

        \App\Jobs\ImportGithubRepos::dispatch($user);

        return back()->with('success', "بدأ الاستيراد — ستظهر مشاريعك قريباً.");
    }

    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required|url|starts_with:https://github.com/',
            'user_notes' => 'nullable|string|max:240',
            'folder' => 'nullable|string|max:50',
        ]);

        try {
            $user = Auth::user();

            if (!$parts = $this->parseRepoUrl($request->url)) {
                return back()->withErrors(['url' => 'رابط GitHub غير صالح']);
            }
            [$owner, $repoName] = $parts;

            $data = $this->github->fetchRepo($user->github_token, $owner, $repoName);

            if (!$data) {
                return back()->withErrors(['url' => 'المشروع غير موجود أو خاص']);
            }

            $user->repos()->updateOrCreate(
                ['github_repo_id' => $data['id']],
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'url' => $data['html_url'],
                    'language' => $data['language'],
                    'stars' => $data['stargazers_count'],
                    'user_notes' => $request->user_notes,
                    'folder' => Auth::user()->is_verified ? $request->folder : null,
                    'is_own_repo' => $this->github->checkContribution($user->github_token, $data['owner']['login'], $data['name'], $user->username),
                ]
            );

            return back()->with('success', 'تمت إضافة المشروع بنجاح');

        } catch (\Exception $e) {
            return back()->with('error', 'فشل إضافة المشروع: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Repo $repo)
    {
        if (!$request->user()->can('update', $repo)) {
            abort(403);
        }

        $request->validate([
            'url' => 'required|url|starts_with:https://github.com/',
            'user_notes' => 'nullable|string|max:240',
            'folder' => 'nullable|string|max:50',
        ]);

        try {
            $user = Auth::user();
            
            // If URL changed, we need to fetch new data
            if ($request->url !== $repo->url) {
                if (!$parts = $this->parseRepoUrl($request->url)) {
                    return back()->withErrors(['url' => 'رابط GitHub غير صالح']);
                }
                [$owner, $repoName] = $parts;

                $data = $this->github->fetchRepo($user->github_token, $owner, $repoName);

                if (!$data) {
                    return back()->withErrors(['url' => 'المشروع غير موجود أو خاص']);
                }

                $repo->update([
                    'github_repo_id' => $data['id'],
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'url' => $data['html_url'],
                    'language' => $data['language'],
                    'stars' => $data['stargazers_count'],
                    'user_notes' => $request->user_notes,
                    'folder' => Auth::user()->is_verified ? $request->folder : null,
                    'is_own_repo' => $this->github->checkContribution($user->github_token, $data['owner']['login'], $data['name'], $user->username),
                ]);
            } else {
                $repo->update([
                    'user_notes' => $request->user_notes,
                    'folder' => Auth::user()->is_verified ? $request->folder : null,
                ]);
            }

            return back()->with('success', 'تم تحديث المشروع بنجاح');

        } catch (\Exception $e) {
            return back()->with('error', 'فشل تحديث المشروع: ' . $e->getMessage());
        }
    }

    public function refreshVerification(Request $request, Repo $repo)
    {
        $user = Auth::user();
        if (!$request->user()->can('update', $repo) || !$user->is_verified) {
            abort(403);
        }

        try {
            if (!$parts = $this->parseRepoUrl($repo->url)) {
                return back()->with('error', 'رابط المشروع غير صالح');
            }
            [$owner, $repoName] = $parts;

            $isContributor = $this->github->checkContribution($user->github_token, $owner, $repoName, $user->username);
            
            $repo->update(['is_own_repo' => $isContributor]);

            return back()->with($isContributor ? 'success' : 'error', $isContributor ? 'تم توثيق ملكية المشروع بنجاح' : 'لم يتم العثور على مساهمات لك في هذا المشروع بعد');
        } catch (\Exception $e) {
            return back()->with('error', 'فشل تحديث حالة التوثيق');
        }
    }

    public function toggleFeature(Request $request, Repo $repo)
    {
        if (!$request->user()->can('update', $repo)) {
            abort(403);
        }

        if (!$repo->is_featured && Auth::user()->repos()->where('is_featured', true)->count() >= 3) {
            return back()->with('error', 'يمكنك تمييز 3 مشاريع فقط كحد أقصى');
        }

        $repo->update(['is_featured' => !$repo->is_featured]);

        return back()->with('success', $repo->is_featured ? 'تم تمييز المشروع' : 'تم إلغاء تمييز المشروع');
    }

    public function destroy(Request $request, Repo $repo)
    {
        if (!$request->user()->can('delete', $repo)) {
            abort(403);
        }
        $repo->delete();
        return back();
    }
}
