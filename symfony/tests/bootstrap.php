<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

if (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
}

if ($_SERVER['APP_DEBUG']) {
    umask(0000);
}

if (($_ENV['APP_ENV'] ?? null) !== 'test') {
    fwrite(STDERR, "❌ APP_ENV doit être 'test' pour exécuter PHPUnit.\n");
    exit(1);
}