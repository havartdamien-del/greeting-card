<?php

namespace App\Tests\Api;

class TagChangeApiTest extends ResetDatabaseApiTestCase
{
    protected $testThatChangeDBStat = "TagChangeApiTest";

    /**
     * Test POST /api/tags - Crée un nouveau tag
     */
    public function testCreateTag(): void
    {
        $this->seLogger();
        
        $payload = [
            'name' => 'forêt',
        ];
        
        $data = $this->postJson('/api/tags', $payload);
        
        // Vérifier que la réponse a un statut 201 (Created)
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        
        // Vérifier que les données retournées contiennent les propriétés envoyées
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('name', $data);
        
        // Vérifier que les valeurs correspondent aux données envoyées
        $this->assertEquals('forêt', $data['name']);
    }

    /**
     * Test DELETE /api/tags/{id} - Supprime un tag
     */
    public function testDeleteTag(): void
    {
        $this->seLogger();
        
        // Récupérer les tags existants
        $tagsData = $this->getJson('/api/tags');
        $this->assertArrayHasKey('member', $tagsData);
        $this->assertNotEmpty($tagsData['member']);
        
        // Récupérer l'ID du premier tag (plage, id=2)
        $tagToDelete = $tagsData['member'][0];
        $tagId = $tagToDelete['id'];
        $tagName = $tagToDelete['name'];
        
        // Vérifier que le tag existe
        $tagData = $this->getJson('/api/tags/' . $tagId);
        $this->assertArrayHasKey('name', $tagData);
        $this->assertEquals($tagName, $tagData['name']);
        
        // Supprimer le tag avec l'appel DELETE
        $this->deleteJson('/api/tags/' . $tagId);
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
        
        // Vérifier que le tag n'existe plus
        $allTagsData = $this->getJson('/api/tags');
        $this->assertArrayHasKey('member', $allTagsData);
        
        $names = array_map(fn($tag) => $tag['name'] ?? null, $allTagsData['member']);
        $this->assertNotContains($tagName, $names);
    }

    /**
     * Test PUT /api/tags/{id} - Modifie un tag
     */
    public function testUpdateTag(): void
    {
        $this->seLogger();
        
        // Récupérer les tags existants
        $tagsData = $this->getJson('/api/tags');
        $this->assertArrayHasKey('member', $tagsData);
        $this->assertNotEmpty($tagsData['member']);
        
        // Récupérer le second tag (plage, id=2)
        $tagToUpdate = $tagsData['member'][1];
        $tagId = $tagToUpdate['id'];
        $originalName = $tagToUpdate['name'];
        
        // Vérifier que le tag existe avec le bon nom
        $tagData = $this->getJson('/api/tags/' . $tagId);
        $this->assertArrayHasKey('name', $tagData);
        $this->assertEquals($originalName, $tagData['name']);
        
        // Modifier le tag avec l'appel PUT
        $payload = [
            'name' => 'océan',
        ];
        
        $updatedData = $this->putJson('/api/tags/' . $tagId, $payload);
        
        // Vérifier que la réponse est successful
        $this->assertResponseIsSuccessful();
        
        // Vérifier que le nom a été modifié
        $this->assertArrayHasKey('name', $updatedData);
        $this->assertEquals('océan', $updatedData['name']);
        
        // Re-vérifier avec un appel GET que le tag a bien le bon nom
        $verifyData = $this->getJson('/api/tags/' . $tagId);
        $this->assertArrayHasKey('name', $verifyData);
        $this->assertEquals('océan', $verifyData['name']);
    }
}
