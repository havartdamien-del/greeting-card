<?php

namespace App\Tests\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Doctrine\ORM\EntityManagerInterface;
use App\DataFixtures\AppFixtures;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\Loader;

/**
 * Classe de base pour tous les tests API
 * Fournit des méthodes utilitaires communes
 */
class ApiTestCase extends WebTestCase
{
    protected KernelBrowser $client;
    protected EntityManagerInterface $entityManager;
    protected ?string $token = null;
    protected $baseDirProject = __DIR__ . '/../../';

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    /**
     * Se connecter avec les identifiants admin et stocker le bearer token
     */
    protected function seLogger(): void
    {
        $payload = [
            'email' => 'admin@test.com',
            'password' => 'password'
        ];
        
        $this->client->request('POST', '/auth', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode($payload));
        
        $response = json_decode($this->client->getResponse()->getContent(), true);
        
        if (isset($response['token'])) {
            $this->token = $response['token'];
        }
    }

    /**
     * Vide la base de données et charge les fixtures
     */
    protected static function loadFixtures(): void
    {
        $entityManager = self::getContainer()->get('doctrine')->getManager();
        $connection = $entityManager->getConnection();
        $schemaManager = $connection->createSchemaManager();
        $tables = $schemaManager->listTableNames();

        $connection->executeStatement('SET FOREIGN_KEY_CHECKS=0');

        foreach ($tables as $table) {
            $connection->executeStatement("TRUNCATE TABLE `$table`");
        }

        $connection->executeStatement('SET FOREIGN_KEY_CHECKS=1');

        $fixture = static::getContainer()->get(AppFixtures::class);

        $loader = new Loader();
        $loader->addFixture($fixture);

        $purger = new ORMPurger($entityManager);
        $executor = new ORMExecutor($entityManager, $purger);

        $executor->execute($loader->getFixtures());
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
     * Envoie des données JSON avec la méthode HTTP spécifiée
     *
     * @param string $method La méthode HTTP (POST, PUT, PATCH)
     * @param string $url L'URL de la requête
     * @param array $data Les données à envoyer
     * @param string $contentType Le type de contenu
     * @param array $headers Les headers additionnels
     * @return array Les données JSON de réponse
     */
    protected function sendDataJson(string $method, string $url, array $data, string $contentType = 'application/ld+json', array $headers = []): array
    {
        $mergedHeaders = array_merge([
            'CONTENT_TYPE' => $contentType,
        ], $headers);
        
        if ($this->token !== null) {
            $mergedHeaders['HTTP_AUTHORIZATION'] = 'Bearer ' . $this->token;
        }
        
        $this->client->request($method, $url, [], [], $mergedHeaders, json_encode($data));
        
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
        return $this->sendDataJson('POST', $url, $data, 'application/ld+json', $headers);
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
        return $this->sendDataJson('PUT', $url, $data, 'application/ld+json', $headers);
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
        return $this->sendDataJson('PATCH', $url, $data, 'application/merge-patch+json', $headers);
    }

    /**
     * Effectue une requête DELETE
     *
     * @param string $url L'URL de la requête
     * @param array $headers Les headers additionnels
     */
    protected function deleteJson(string $url, array $headers = []): void
    {
        if ($this->token !== null) {
            $headers['HTTP_AUTHORIZATION'] = 'Bearer ' . $this->token;
        }
        
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
