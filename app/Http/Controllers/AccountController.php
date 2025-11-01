<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    public function index()
    {
        return inertia('account/general');
    }

    public function profileDetailsPatch()
    {
        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:1', 'regex:/^[a-zA-Z0-9 _-]+$/', 'max:50'],
            'email' => [
                'bail',
                'required',
                'string',
                'email',
                'max:50',
                Rule::unique('users')->ignore(Auth::id()),
            ],
        ]);

        Auth::user()->update($validated);

        return back()
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Your profile details have been updated',
            ]);
    }
}
