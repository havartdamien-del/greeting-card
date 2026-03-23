<?php

namespace App\Tests\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;

/**
 * Classe de base pour tous les tests API
 * Fournit des méthodes utilitaires communes
 */
class ApiTestCase extends WebTestCase
{
    protected KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    /**
     * Effectue une requête GET et retourne les données JSON décodées
     *
     * @param string $url L'URL de la requête
     * @return array Les données JSON décodées
     */
    protected function getJson(string $url): array
    {
        $this->client->request('GET', $url);
        return json_decode($this->client->getResponse()->getContent(), true);
    }

    /**
     * Effectue une requête POST avec les données JSON
     *
     * @param string $url L'URL de la requête
     * @param array $data Les données à envoyer
     * @param array $headers Les headers additionnels
     * @return array Les données JSON de réponse
     */
    protected function postJson(string $url, array $data, array $headers = []): array
    {
        $this->client->request('POST', $url, [], [], array_merge([
            'CONTENT_TYPE' => 'application/ld+json',
        ], $headers), json_encode($data));
        
        return json_decode($this->client->getResponse()->getContent(), true);
    }

    /**
     * Effectue une requête PUT avec les données JSON
     *
     * @param string $url L'URL de la requête
     * @param array $data Les données à envoyer
     * @param array $headers Les headers additionnels
     * @return array Les données JSON de réponse
     */
    protected function putJson(string $url, array $data, array $headers = []): array
    {
        $this->client->request('PUT', $url, [], [], array_merge([
            'CONTENT_TYPE' => 'application/ld+json',
        ], $headers), json_encode($data));
        
        return json_decode($this->client->getResponse()->getContent(), true);
    }

    /**
     * Effectue une requête PATCH avec les données JSON
     *
     * @param string $url L'URL de la requête
     * @param array $data Les données à envoyer
     * @param array $headers Les headers additionnels
     * @return array Les données JSON de réponse
     */
    protected function patchJson(string $url, array $data, array $headers = []): array
    {
        $this->client->request('PATCH', $url, [], [], array_merge([
            'CONTENT_TYPE' => 'application/merge-patch+json',
        ], $headers), json_encode($data));
        
        return json_decode($this->client->getResponse()->getContent(), true);
    }

    /**
     * Effectue une requête DELETE
     *
     * @param string $url L'URL de la requête
     * @param array $headers Les headers additionnels
     */
    protected function deleteJson(string $url, array $headers = []): void
    {
        $this->client->request('DELETE', $url, [], [], $headers);
    }

    /**
     * Assertions pour les réponses API
     */
    protected function assertIsValidJsonResponse(): void
    {
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
    }

    protected function assertIsValidJsonCollectionResponse(): void
    {
        $this->assertIsValidJsonResponse();
        $response = json_decode($this->client->getResponse()->getContent(), true);
        
        $this->assertArrayHasKey('@context', $response);
        $this->assertArrayHasKey('@type', $response);
        $this->assertArrayHasKey('member', $response);
        $this->assertArrayHasKey('totalItems', $response);
        $this->assertIsArray($response['member']);
        $this->assertIsInt($response['totalItems']);
    }

    protected function assertHasCardProperties(array $card): void
    {
        $this->assertArrayHasKey('@id', $card);
        $this->assertArrayHasKey('@type', $card);
        $this->assertArrayHasKey('id', $card);
        $this->assertArrayHasKey('title', $card);
        $this->assertArrayHasKey('description', $card);
        $this->assertArrayHasKey('isActif', $card);
        $this->assertArrayHasKey('tags', $card);
    }
}
