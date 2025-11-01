<?php

namespace App\Http\Controllers;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('register');
    }

    public function post() {}
}
