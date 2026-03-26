<?php

namespace App\Tests\Api;

class ReadOnlyApiTestCase extends ApiTestCase
{
    private static bool $loaded = false;

    protected function setUp(): void
    {
        parent::setUp();

        if (!self::$loaded) {
            self::loadFixtures();
            self::$loaded = true;
        }
    }
}