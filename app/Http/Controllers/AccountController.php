<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    public function index()
    {
        return inertia('account/account');
    }

    public function post()
    {
        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:1', 'max:50'],
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

        return back();
    }

    public function delete()
    {
        $userId = Auth::id();

        LogoutController::logoutAllDevicesAction(destroyUser: true);

        User::destroy($userId);

        return redirect()->route('home');
    }
}
