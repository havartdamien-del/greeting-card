<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class AuthControllerTest extends WebTestCase
{
    public function testIndex(): void
    {
        $client = static::createClient();
        $client->request('POST', '/auth', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'email' => 'admin@test.com',
            'password' => 'password'
        ]));

        self::assertResponseIsSuccessful();
    }
}
