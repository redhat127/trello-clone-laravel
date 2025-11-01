<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\HttpStatus;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            // AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->redirectGuestsTo(fn () => route('login.index'));
        $middleware->redirectUsersTo(fn () => route('home'));
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (
            Response $response,
            Throwable $exception,
            Request $request
        ) {
            if (
                ! app()->isProduction() ||
                $exception instanceof ValidationException
            ) {
                return $response;
            }

            $statusCode = $response->getStatusCode();

            if ($statusCode < 400 || $statusCode >= 600) {
                return $response;
            }

            $message = HttpStatus::getMessage($statusCode);

            if (! $request->isMethod('GET')) {
                return back()
                    ->with('flashMessage', [
                        'type' => 'error',
                        'text' => $message,
                    ]);
            }

            return inertia('error', [
                'statusCode' => $statusCode,
                'title' => HttpStatus::getTitle($statusCode),
                'message' => $message,
            ])
                ->toResponse($request)
                ->setStatusCode($statusCode);
        });
    })->create();
