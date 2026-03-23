<?php

namespace App\Tests\Api;

class CardApiTest extends ApiTestCase
{
    /**
     * Test GET /api/cards - Récupère la liste de toutes les cards
     */
    public function testGetCardsCollection(): void
    {
        $data = $this->getJson('/api/cards');
        
        // Vérifier que la réponse a un statut 200
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // Vérifier que la réponse est du JSON valide
        $this->assertIsValidJsonCollectionResponse();
        
        // Vérifier la structure de base
        $this->assertIsArray($data);
    }

    /**
     * Test GET /api/cards - Vérifier la structure d'une card dans la collection
     */
    public function testCardsHaveCorrectStructure(): void
    {
        $data = $this->getJson('/api/cards');
        $this->assertResponseIsSuccessful();
        
        // S'il y a au moins une card, vérifier sa structure
        if (count($data['hydra:member']) > 0) {
            $card = $data['hydra:member'][0];
            
            // Vérifier que la card a les propriétés requises
            $this->assertHasCardProperties($card);
            
            // Vérifier les types de données
            $this->assertIsInt($card['id']);
            $this->assertIsString($card['title']);
            $this->assertIsBool($card['isActif']);
            $this->assertIsArray($card['tags']);
        }
    }

    /**
     * Test GET /api/cards_active - Récupère la liste des cards actives
     */
    public function testGetActiveCardsCollection(): void
    {
        $data = $this->getJson('/api/cards_active');
        
        // Vérifier que la réponse a un statut 200
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // Vérifier que la réponse est du JSON
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        
        // Vérifier que la structure de réponse est correcte
        $this->assertIsArray($data);
        $this->assertArrayHasKey('hydra:member', $data);
        $this->assertIsArray($data['hydra:member']);
        
        // Vérifier que toutes les cards retournées sont actives
        foreach ($data['hydra:member'] as $card) {
            $this->assertTrue(
                $card['isActif'],
                'Une card inactive a été retournée par l\'endpoint /api/cards_active'
            );
        }
    }

    /**
     * Test GET /api/cards/{id} - Récupère une card spécifique
     */
    public function testGetSingleCard(): void
    {
        // D'abord, récupérer la liste pour obtenir une ID valide
        $data = $this->getJson('/api/cards');
        $this->assertResponseIsSuccessful();
        
        if (count($data['hydra:member']) > 0) {
            $firstCard = $data['hydra:member'][0];
            $cardId = $firstCard['id'];
            
            // Tester la récupération d'une card spécifique
            $cardData = $this->getJson("/api/cards/{$cardId}");
            
            $this->assertResponseIsSuccessful();
            $this->assertResponseStatusCodeSame(200);
            
            // Vérifier les propriétés de la card
            $this->assertArrayHasKey('id', $cardData);
            $this->assertArrayHasKey('title', $cardData);
            $this->assertEquals($cardId, $cardData['id']);
        }
    }

    /**
     * Test GET /api/cards avec pagination
     */
    public function testCardsCollectionPagination(): void
    {
        $data = $this->getJson('/api/cards?page=1');
        
        $this->assertResponseIsSuccessful();
        
        // Vérifier que les données de pagination sont présentes
        $this->assertArrayHasKey('hydra:view', $data);
        $this->assertIsArray($data['hydra:view']);
    }

    /**
     * Test GET /api/cards avec filtrage (isActif)
     */
    public function testCardsCollectionFiltering(): void
    {
        $data = $this->getJson('/api/cards?isActif=true');
        
        $this->assertResponseIsSuccessful();
        
        // Vérifier que seulement les cards actives sont retournées
        foreach ($data['hydra:member'] as $card) {
            $this->assertTrue($card['isActif']);
        }
    }
}
