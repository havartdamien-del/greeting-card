<?php

namespace App\Tests\Api;

class CardChangeApiTest extends ResetDatabaseApiTestCase
{
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

    /**
     * Test DELETE /api/cards/{id} - Supprime une card
     */
    public function testDeleteCard(): void
    {
        // Vérifier que la card id=3 existe et a le titre "Sable blanc et palmiers"
        $cardData = $this->getJson('/api/cards/3');
        $this->assertArrayHasKey('title', $cardData);
        $this->assertEquals('Sable blanc et palmiers', $cardData['title']);
        
        // Supprimer la card avec l'appel DELETE
        $this->deleteJson('/api/cards/3');
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
        
        // Vérifier que le titre "Sable blanc et palmiers" n'existe plus
        $allCardsData = $this->getJson('/api/cards');
        $this->assertArrayHasKey('member', $allCardsData);
        
        $titles = array_map(fn($card) => $card['title'] ?? null, $allCardsData['member']);
        $this->assertNotContains('Sable blanc et palmiers', $titles);
    }

    /**
     * Test PUT /api/cards/{id} - Modifie une card
     */
    public function testUpdateCard(): void
    {
        // Vérifier que la card id=4 existe et a le titre "Lac calme et serein"
        $cardData = $this->getJson('/api/cards/4');
        $this->assertArrayHasKey('title', $cardData);
        $this->assertEquals('Lac calme et serein', $cardData['title']);
        
        // Modifier la card avec l'appel PUT
        $payload = [
            'title' => 'Rivière calme et sereine',
            'description' => $cardData['description'],
            'isActif' => $cardData['isActif'],
        ];
        
        $updatedData = $this->putJson('/api/cards/4', $payload);
        
        // Vérifier que la réponse est successful
        $this->assertResponseIsSuccessful();
        
        // Vérifier que le titre a été modifié
        $this->assertArrayHasKey('title', $updatedData);
        $this->assertEquals('Rivière calme et sereine', $updatedData['title']);
        
        // Re-vérifier avec un appel GET que la card a bien le bon titre
        $verifyData = $this->getJson('/api/cards/4');
        $this->assertArrayHasKey('title', $verifyData);
        $this->assertEquals('Rivière calme et sereine', $verifyData['title']);
    }

    /**
     * Test PATCH /api/cards/{id} - Modifie partiellement une card
     */
    public function testPatchUpdateCard(): void
    {
        // Vérifier que la card id=4 existe et a le titre "Lac calme et serein"
        $cardData = $this->getJson('/api/cards/4');
        $this->assertArrayHasKey('title', $cardData);
        $this->assertEquals('Lac calme et serein', $cardData['title']);
        $originalDescription = $cardData['description'];
        
        // Modifier la card avec l'appel PATCH (seulement le titre)
        $payload = [
            'title' => 'Étang paisible et reposant',
        ];
        
        $patchedData = $this->patchJson('/api/cards/4', $payload);
        
        // Vérifier que la réponse est successful
        $this->assertResponseIsSuccessful();
        
        // Vérifier que le titre a été modifié
        $this->assertArrayHasKey('title', $patchedData);
        $this->assertEquals('Étang paisible et reposant', $patchedData['title']);
        
        // Re-vérifier avec un appel GET que la card a bien le bon titre
        $verifyData = $this->getJson('/api/cards/4');
        $this->assertArrayHasKey('title', $verifyData);
        $this->assertEquals('Étang paisible et reposant', $verifyData['title']);
        
        // Vérifier que la description n'a pas changé
        $this->assertArrayHasKey('description', $verifyData);
        $this->assertEquals($originalDescription, $verifyData['description']);
    }
}