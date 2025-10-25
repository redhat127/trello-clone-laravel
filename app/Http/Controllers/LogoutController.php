<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function post()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        inertia()->clearHistory();

        return redirect()->route('home');
    }
}
