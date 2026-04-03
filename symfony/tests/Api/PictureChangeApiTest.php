<?php

namespace App\Tests\Api;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class PictureChangeApiTest extends ResetDatabaseApiTestCase
{
    protected $testThatChangeDBStat = "PictureChangeApiTest";

    /**
     * Test PATCH /api/pictures/{id} - Modifie partiellement une picture
     */
    public function testPatchUpdatePicture(): void
    {
        $this->seLogger();
        
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

    /**
     * Test POST /api/pictures/upload - Upload une image
     */
    public function testUploadPicture(): void
    {
        $this->seLogger();
        
        // Récupérer le nombre de pictures avant l'upload
        $beforeUpload = $this->getJson('/api/pictures');
        $countBefore = count($beforeUpload['member']);
        
        // Préparer le fichier à uploader
        //$sourcePath = __DIR__ . '/../../public/image_test/montagne1.jpg';
        $sourcePath = $this->baseDirProject . 'public/image_test/montagne1.jpg';
        $sourceTmpPath = $this->baseDirProject . 'public/image_test/tmp_montagne1.jpg';
        $this->assertFileExists($sourcePath, 'Le fichier source montagne1.jpg doit exister');
        
        // remarque la methode $this->client->request va effacer le fichier, 
        // on va donc lui envoyer une copie du fichier à la place
        copy(
            $sourcePath,
            $sourceTmpPath
        );

        // Créer une instance UploadedFile pour le test
        $uploadedFile = new UploadedFile(
            $sourceTmpPath,
            'tmp_montagne1.jpg',
            'image/jpeg',
            null,
            true
        );

        // Préparer les headers avec le bearer token
        $headers = ['CONTENT_TYPE' => 'multipart/form-data'];
        if ($this->token !== null) {
            $headers['HTTP_AUTHORIZATION'] = 'Bearer ' . $this->token;
        }
        
        // Faire la requête POST avec le fichier
        $this->client->request(
            'POST',
            '/api/pictures/upload',
            [],
            ['file' => $uploadedFile],
            $headers
        );

        // Vérifier que la réponse est successful
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        
        // Récupérer la réponse
        $response = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('picture', $response);
        $this->assertArrayHasKey('value', $response['picture']);
        $uploadedFileName = $response['picture']['value'];
        
        // Vérifier que le fichier a été uploadé dans le répertoire public/uploads/
        $uploadPath = __DIR__ . '/../../public/uploads/' . $uploadedFileName;
        $this->assertFileExists($uploadPath, 'Le fichier uploadé doit exister dans le répertoire uploads/');
        
        // Vérifier que l'image a bien été créée en appelant /api/pictures
        $afterUpload = $this->getJson('/api/pictures');
        $countAfter = count($afterUpload['member']);
        
        // Vérifier qu'une nouvelle picture a été ajoutée
        $this->assertEquals($countBefore + 1, $countAfter, 'Une nouvelle picture doit avoir été créée');
        
        // Nettoyer : supprimer le fichier uploadé
        if (file_exists($uploadPath)) {
            unlink($uploadPath);
        }
    }
}
