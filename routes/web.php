<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::prefix('login')
        ->name('login.')
        ->controller(LoginController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'post')->name('post');
        });

    Route::prefix('register')
        ->name('register.')
        ->controller(RegisterController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'post')->name('post');
        });
});

Route::middleware('auth')->group(function () {
    Route::prefix('logout')
        ->name('logout.')
        ->controller(LogoutController::class)
        ->group(function () {
            Route::post('/', 'post')->name('post');
        });
});
