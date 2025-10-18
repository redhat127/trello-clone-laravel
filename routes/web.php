<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
})->name('home');

Route::prefix('login')->name('login.')
    ->middleware('guest')
    ->controller(LoginController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'post')->name('post');
    });

Route::prefix('register')->name('register.')
    ->middleware('guest')
    ->controller(RegisterController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'post')->name('post');
    });

Route::prefix('logout')->name('logout.')
    ->middleware('auth')
    ->controller(LogoutController::class)
    ->group(function () {
        Route::post('/', 'post')->name('post');
    });

Route::prefix('account')->name('account.')
    ->middleware('auth')
    ->controller(AccountController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'post')->name('post');
        Route::post('/avatar', 'avatarPost')->name('avatarPost');
        Route::delete('/avatar', 'avatarDelete')->name('avatarDelete');
    });
