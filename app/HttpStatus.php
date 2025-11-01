<?php

namespace App;

class HttpStatus
{
    private static array $titles = [
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        419 => 'Session Expired',
        429 => 'Too Many Requests',
        500 => 'Internal Server Error',
        503 => 'Service Unavailable',
    ];

    private static array $messages = [
        401 => 'You do not have the necessary credentials to access this resource',
        402 => 'A payment is required to continue',
        403 => 'You do not have permission to access this resource',
        404 => 'The requested resource could not be found',
        419 => 'Page has expired, please try again',
        429 => 'You have made too many requests, please try again later',
        500 => 'An internal server error has occurred, please contact support if the problem persists',
        503 => 'The service is temporarily unavailable, please try again later',
    ];

    public static function getTitle(int $statusCode): string
    {
        return self::$titles[$statusCode] ?? 'Error';
    }

    public static function getMessage(int $statusCode): string
    {
        return self::$messages[$statusCode] ?? 'Something went wrong, please try again';
    }
}
