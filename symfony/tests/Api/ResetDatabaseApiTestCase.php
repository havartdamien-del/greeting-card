<?php

namespace App\Tests\Api;

abstract class ResetDatabaseApiTestCase extends ApiTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        self::loadFixtures(); // chaque test
    }
}