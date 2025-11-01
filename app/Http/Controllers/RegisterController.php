<?php

namespace App\Http\Controllers;

use App\Models\User;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('register');
    }

    public function post()
    {
        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:1', 'regex:/^[a-zA-Z0-9 _-]+$/', 'max:50'],
            'email' => ['bail', 'required', 'string', 'email', 'max:50', 'unique:users,email'],
            'password' => ['bail', 'required', 'string', 'min:10', 'max:50'],
        ]);

        User::create($validated);

        return redirect()->route('login.index')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'You are registered',
            ]);
    }
}
