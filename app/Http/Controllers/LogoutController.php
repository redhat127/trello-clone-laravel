<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LogoutController extends Controller
{
    public function post()
    {
        self::logoutAction();

        return redirect()->route('home');
    }

    public static function logoutAction()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        inertia()->clearHistory();
    }

    public static function logoutAllDevicesAction(bool $destroyUser = false)
    {
        if (! $destroyUser) {
            Auth::user()->update(['remember_token' => null]);
        }

        DB::table('sessions')->where('user_id', Auth::id())->delete();

        self::logoutAction();
    }
}
