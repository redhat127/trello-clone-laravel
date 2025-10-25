<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
})->name('home');

Route::prefix('login')
    ->name('login.')
    ->middleware('guest')
    ->controller(LoginController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'post')->name('post');
    });

Route::prefix('logout')
    ->name('logout.')
    ->middleware('auth')
    ->controller(LogoutController::class)
    ->group(function () {
        Route::post('/', 'post')->name('post');
    });
