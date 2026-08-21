<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Repo;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $query = User::with(['verifications' => function($q) {
                $q->where('status', 'pending')->latest();
            }])
            ->withExists(['verifications as has_pending_verification' => function($q) {
                $q->where('status', 'pending');
            }]);

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('username', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter
        if ($request->has('filter')) {
            $filter = $request->filter;
            if ($filter === 'pending') {
                $query->whereHas('verifications', function($q) {
                    $q->where('status', 'pending');
                });
            } elseif ($filter === 'verified') {
                $query->where('is_verified', true);
            } elseif ($filter === 'banned') {
                $query->where('status', 'banned');
            }
        }

        $users = $query->orderByDesc('has_pending_verification')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'posts' => Post::count(),
                'repos' => Repo::count(),
                'pending_verifications' => Verification::where('status', 'pending')->count(),
            ],
            'users' => $users,
            'filters' => $request->only(['search', 'filter', 'per_page']),
        ]);
    }

    public function repos(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $query = Repo::with('user');

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%");
                  });
            });
        }

        $repos = $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Repos', [
            'repos' => $repos,
            'stats' => [
                'users' => User::count(),
                'posts' => Post::count(),
                'repos' => Repo::count(),
                'pending_verifications' => Verification::where('status', 'pending')->count(),
            ],
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function approveVerification($id)
    {
        $verification = Verification::findOrFail($id);
        $verification->update(['status' => 'approved']);
        $verification->user->update(['is_verified' => true]);
        
        return back()->with('success', 'تم توثيق الحساب بنجاح.');
    }

    public function rejectVerification($id)
    {
        $verification = Verification::findOrFail($id);
        $verification->update(['status' => 'rejected']);
        
        return back()->with('success', 'تم رفض التوثيق.');
    }

    public function verifyUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_verified' => true]);
        
        return back()->with('success', 'تم توثيق المستخدم بنجاح.');
    }

    public function unverifyUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_verified' => false]);
        
        return back()->with('success', 'تم إلغاء توثيق المستخدم.');
    }

    public function banUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['status' => 'banned']);
        
        return back()->with('success', 'تم حظر المستخدم.');
    }

    public function unbanUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['status' => 'active']);
        
        return back()->with('success', 'تم إلغاء حظر المستخدم.');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        
        return back()->with('success', 'تم حذف المستخدم.');
    }

    public function bulkAction(Request $request)
    {
        $action = $request->input('action');
        $userIds = $request->input('user_ids', []);

        if (empty($userIds)) {
            return back()->with('error', 'لم يتم تحديد أي مستخدمين.');
        }

        switch ($action) {
            case 'verify':
                User::whereIn('id', $userIds)->update(['is_verified' => true]);
                return back()->with('success', 'تم توثيق المستخدمين المحددين.');
            
            case 'unverify':
                User::whereIn('id', $userIds)->update(['is_verified' => false]);
                return back()->with('success', 'تم إلغاء توثيق المستخدمين المحددين.');
            
            case 'ban':
                User::whereIn('id', $userIds)->update(['status' => 'banned']);
                return back()->with('success', 'تم حظر المستخدمين المحددين.');
            
            case 'unban':
                User::whereIn('id', $userIds)->update(['status' => 'active']);
                return back()->with('success', 'تم إلغاء حظر المستخدمين المحددين.');
            
            case 'delete':
                User::whereIn('id', $userIds)->delete();
                return back()->with('success', 'تم حذف المستخدمين المحددين.');
            
            default:
                return back()->with('error', 'إجراء غير صالح.');
        }
    }

    public function deleteRepo($id)
    {
        $repo = Repo::findOrFail($id);
        $repo->delete();
        
        return back()->with('success', 'تم حذف المشروع بنجاح.');
    }
}
