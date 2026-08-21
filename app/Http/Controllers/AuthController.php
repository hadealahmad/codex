<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('github')
            ->scopes(['read:user', 'user:email', 'public_repo'])
            ->redirect();
    }

    public function callback()
    {
        try {
            $githubUser = Socialite::driver('github')->user();

            $user = User::updateOrCreate([
                'github_id' => $githubUser->getId(),
            ], [
                'name' => $githubUser->getName() ?? $githubUser->getNickname(),
                'email' => $githubUser->getEmail(),
                'username' => $githubUser->getNickname(),
                'avatar_url' => $githubUser->getAvatar(),
                'github_avatar_url' => $githubUser->getAvatar(),
                'github_token' => $githubUser->token,
                'password' => null,
                'email_verified_at' => now(), // Auto verify email from GitHub
            ]);

            if ($user->status === 'banned') {
                return redirect('/')->with('error', 'تم حظر حسابك.');
            }

            Auth::login($user);

            return redirect('/');
        } catch (\Exception $e) {
            return redirect('/')->with('error', 'فشل تسجيل الدخول بواسطة GitHub: ' . $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
