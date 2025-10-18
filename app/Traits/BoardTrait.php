<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait BoardTrait
{
    public static function getCacheKey()
    {
        return Auth::id().'_boards';
    }
}
