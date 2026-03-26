<?php

namespace App\Tests\Api;

class CardChangeApiTest extends ResetDatabaseApiTestCase
{
    protected $testThatChangeDBStat = "CardChangeApiTest";


    /**
     * Test POST /api/cards - Crée une nouvelle card
     */
    public function testCreateCard(): void
    {
        // Récupérer les tags existants pour créer une référence
        $tagsData = $this->getJson('/api/tags');
        $tagIds = [];
        if (isset($tagsData['member']) && count($tagsData['member']) > 0) {
            // Utiliser les 2 premiers tags disponibles
            $tagIds = array_slice(array_map(fn($tag) => $tag['@id'], $tagsData['member']), 0, 2);
        }
        
        $payload = [
            'title' => 'Test Card',
            'description' => 'Test Description',
            'isActif' => true,
            'tags' => $tagIds,
        ];
        
        $data = $this->postJson('/api/cards', $payload);
        
        // Vérifier que la réponse a un statut 201 (Created)
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        
        // Vérifier que les données retournées contiennent les propriétés envoyées
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('title', $data);
        $this->assertArrayHasKey('isActif', $data);
        $this->assertArrayHasKey('tags', $data);
        
        // Vérifier que les valeurs correspondent aux données envoyées
        $this->assertEquals('Test Card', $data['title']);
        $this->assertEquals('Test Description', $data['description']);
        $this->assertTrue($data['isActif']);
        $this->assertIsArray($data['tags']);
    }


}
