<?php

namespace App\Tests\Api;

class PictureChangeApiTest extends ResetDatabaseApiTestCase
{
    protected $testThatChangeDBStat = "PictureChangeApiTest";

    /**
     * Test PATCH /api/pictures/{id} - Modifie partiellement une picture
     */
    public function testPatchUpdatePicture(): void
    {
        // Vérifier que la picture id=2 existe
        $pictureData = $this->getJson('/api/pictures/2');
        $this->assertArrayHasKey('value', $pictureData);
        $this->assertArrayHasKey('type', $pictureData);
        $originalValue = $pictureData['value'];
        $originalType = $pictureData['type'];
        
        // Modifier la picture avec l'appel PATCH
        $payload = [
            'value' => 'chrome://branding/content/about-logo.png',
            'type' => 'url',
        ];
        
        $patchedData = $this->patchJson('/api/pictures/2', $payload);
        
        // Vérifier que la réponse est successful
        $this->assertResponseIsSuccessful();
        
        // Vérifier que la valeur et le type ont été modifiés
        $this->assertArrayHasKey('value', $patchedData);
        $this->assertArrayHasKey('type', $patchedData);
        $this->assertEquals('chrome://branding/content/about-logo.png', $patchedData['value']);
        $this->assertEquals('url', $patchedData['type']);
        
        // Re-vérifier avec un appel GET que la picture a bien été modifiée
        $verifyData = $this->getJson('/api/pictures/2');
        
        $this->assertArrayHasKey('value', $verifyData);
        $this->assertArrayHasKey('type', $verifyData);
        $this->assertEquals('chrome://branding/content/about-logo.png', $verifyData['value']);
        $this->assertEquals('url', $verifyData['type']);
    }
}
