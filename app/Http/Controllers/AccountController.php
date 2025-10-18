<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index()
    {
        return inertia('account');
    }

    public function post()
    {
        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:3', 'max:50'],
        ]);

        Auth::user()->update($validated);

        return back();
    }
}
