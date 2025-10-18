<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Intervention\Image\Laravel\Facades\Image;

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

    public function avatarPost()
    {
        request()->validate([
            'avatar' => [
                'bail',
                'required',
                File::types(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
                    ->max('2mb'),
            ],
        ]);

        if (request()->hasFile('avatar')) {
            $file = request()->file('avatar');

            $filename = 'avatar_'.Auth::id().'_'.time().'.webp';

            $image = Image::read($file);

            $image->cover(300, 300);

            $encoded = $image->toWebp(quality: 80);

            Storage::disk('public')->put('avatars/'.$filename, $encoded);

            $prevAvatar = Auth::user()->avatar;

            Auth::user()->update([
                'avatar' => 'avatars/'.$filename,
            ]);

            if ($prevAvatar && Storage::disk('public')->exists($prevAvatar)) {
                Storage::disk('public')->delete($prevAvatar);
            }

            return back();
        }
    }

    public function avatarDelete()
    {
        $prevAvatar = Auth::user()->avatar;

        Auth::user()->update([
            'avatar' => null,
        ]);

        if ($prevAvatar && Storage::disk('public')->exists($prevAvatar)) {
            Storage::disk('public')->delete($prevAvatar);
        }

        return back();
    }
}
