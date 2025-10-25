<?php

namespace App\Support;

class Error
{
    private static array $TITLES = [
        403 => 'Forbidden',
        404 => 'Not Found',
        500 => 'Internal Server Error',
        503 => 'Service Unavailable',
    ];

    private static array $MESSAGES = [
        403 => 'You do not have permission to access this resource',
        404 => 'The requested resource could not be found',
        419 => 'Page has expired. Please refresh the page and try again',
        500 => 'The server encountered an unexpected condition. Please try again later or contact support',
        503 => 'The server is currently unable to handle the request. Please try again in a few minutes',
    ];

    public static function geTitle(int $statusCode)
    {
        return self::$TITLES[$statusCode] ?? 'Error';
    }

    public static function getMessage(int $statusCode)
    {
        return self::$MESSAGES[$statusCode] ?? 'An error occurred. Please try again later or contact support if the problem persists';
    }
}
