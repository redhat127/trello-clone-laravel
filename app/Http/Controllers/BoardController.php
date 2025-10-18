<?php

namespace App\Http\Controllers;

use App\Traits\BoardTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class BoardController extends Controller
{
    use BoardTrait;

    public function post()
    {
        $validated = request()->validate([
            'title' => ['bail', 'required', 'string', 'min:6', 'max:100'],
            'description' => ['bail', 'nullable', 'string', 'max:200'],
            'color' => ['bail', 'required', 'string', Rule::in([
                'bg-blue-600',
                'bg-red-600',
                'bg-orange-600',
                'bg-green-600',
            ])],
        ]);

        Auth::user()->boards()->create($validated);

        Cache::forget(BoardTrait::getCacheKey());

        return back();
    }
}
