<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Traits\BoardTrait;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    use BoardTrait;

    public function index()
    {
        $boards = Cache::rememberForever(BoardTrait::getCacheKey(), function () {
            return Board::select([
                'id',
                'title',
                'slug',
                'description',
                'user_id',
                'created_at',
                'updated_at',
            ])->oldest()->get()->toResourceCollection();
        });

        return inertia('home', compact('boards'));
    }
}
