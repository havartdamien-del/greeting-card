<?php

namespace App\Tests\Api;

class PictureApiTest extends ReadOnlyApiTestCase
{
    /**
     * Test GET /api/pictures - Récupère la liste de toutes les pictures
     * Vérifie qu'il y a 12 pictures
     */
    public function testGetPicturesCollection(): void
    {
        $data = $this->getJson('/api/pictures');
        
        // Vérifier que la réponse a un statut 200
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // Vérifier que la réponse est du JSON valide
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        
        // Vérifier la structure de base
        $this->assertIsArray($data);
        $this->assertArrayHasKey('member', $data);
        $this->assertIsArray($data['member']);
        
        // Vérifier qu'il y a exactement 12 pictures
        $this->assertCount(12, $data['member']);
    }

    /**
     * Test GET /api/pictures/2 - Récupère la picture avec l'ID 2 et vérifie ses propriétés
     */
    public function testGetPictureById(): void
    {
        $data = $this->getJson('/api/pictures/2');
        
        // Vérifier que la réponse a un statut 200
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // Vérifier la structure de réponse
        $this->assertIsArray($data);
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('type', $data);
        $this->assertArrayHasKey('value', $data);
        
        // Vérifier que la picture a les bonnes propriétés
        $this->assertEquals(2, $data['id']);
        $this->assertEquals('fichier', $data['type']);
        $this->assertEquals('plage6.jpg', $data['value']);
    }

    /**
     * Test GET /api/pictures/13 - Vérifie que la réponse pour une picture inexistante retourne une erreur
     */
    public function testGetNonExistentPicture(): void
    {
        $data = $this->getJson('/api/pictures/13');
        
        // Vérifier que la réponse est une erreur (404 Not Found)
        $this->assertResponseStatusCodeSame(404);
    }
}
