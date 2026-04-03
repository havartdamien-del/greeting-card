<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;

class SimpleTest extends TestCase
{
    public function testSomething(): void
    {
        $two = 1 + 1;

        $this->assertTrue($two == 2);
    }
}
