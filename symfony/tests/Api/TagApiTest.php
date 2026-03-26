<?php

namespace App\Tests\Api;

class TagApiTest extends ReadOnlyApiTestCase
{
    /**
     * Test GET /api/tags - Récupère la liste de tous les tags
     * Vérifie qu'il y a 4 tags : ville, plage, lac et montagne
     */
    public function testGetTagsCollection(): void
    {
        $data = $this->getJson('/api/tags');
        
        // Vérifier que la réponse a un statut 200
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // Vérifier que la réponse est du JSON valide
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        
        // Vérifier la structure de base
        $this->assertIsArray($data);
        $this->assertArrayHasKey('member', $data);
        $this->assertIsArray($data['member']);
        
        // Vérifier qu'il y a exactement 4 tags
        $this->assertCount(4, $data['member']);
        
        // Vérifier que les tags attendus sont présents
        $tagNames = array_map(fn($tag) => $tag['name'], $data['member']);
        $this->assertContains('ville', $tagNames);
        $this->assertContains('plage', $tagNames);
        $this->assertContains('lac', $tagNames);
        $this->assertContains('montagne', $tagNames);
    }

    /**
     * Test GET /api/tags/2 - Récupère le tag avec l'ID 2 et vérifie qu'il s'agit du tag "plage"
     */
    public function testGetTagById(): void
    {
        $data = $this->getJson('/api/tags/2');
        
        // Vérifier que la réponse a un statut 200
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // Vérifier la structure de réponse
        $this->assertIsArray($data);
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('name', $data);
        
        // Vérifier que le tag est bien "plage"
        $this->assertEquals(2, $data['id']);
        $this->assertEquals('plage', $data['name']);
    }

    /**
     * Test GET /api/tags/5 - Vérifie que la réponse pour un tag inexistant est vide ou une erreur
     */
    public function testGetNonExistentTag(): void
    {
        $data = $this->getJson('/api/tags/5');
        
        // Vérifier que la réponse est une erreur (404 Not Found)
        $this->assertResponseStatusCodeSame(404);
    }
}
