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
    protected $baseDirProject = __DIR__ . '/../../';
    // protected $classTestThatChangeDB = false;

    protected function setUp(): void
    {
echo "***** exec parent setUp() \n";
// echo "***** exec setUp() ".$this->classTestThatChangeDB." \n";


        $this->client = static::createClient();
        // if($this->classTestThatChangeDB === true) {
        //     ApiTestCase::loadFixtures();
        // }
    }

//     public static function setUpBeforeClass(): void
//     {
// echo "***** exec setUpBeforeClass()";
//         //ApiTestCase::loadFixtures();
// //echo "***** exec setUpBeforeClass() ".$this->testThatChangeDBStat." \n";
//     }

    /**
     * Vide la base de données et charge les fixtures
     */
    protected static function loadFixtures(): void
    {

echo "***** exec loadFixtures() \n";

        $entityManager = self::getContainer()->get('doctrine')->getManager();
        $connection = $entityManager->getConnection();
        $schemaManager = $connection->createSchemaManager();
        $tables = $schemaManager->listTableNames();

        $connection->executeStatement('SET FOREIGN_KEY_CHECKS=0');

        foreach ($tables as $table) {
            $connection->executeStatement("TRUNCATE TABLE `$table`");
        }

        $connection->executeStatement('SET FOREIGN_KEY_CHECKS=1');

        /*$kernel = static::bootKernel();
        $container = $kernel->getContainer();
        
        $entityManager = $container->get(EntityManagerInterface::class);
        $connection = $entityManager->getConnection();
        
        // Désactiver les contraintes de clé étrangère
        $connection->executeStatement('SET FOREIGN_KEY_CHECKS=0');
        
        // Récupérer et vider toutes les tables
        $tables = $connection->createSchemaManager()->listTableNames();
        foreach ($tables as $table) {
            if ($table !== 'doctrine_migration_versions') { // Ignorer les migrations
                $connection->executeStatement("TRUNCATE TABLE `$table`");
            }
        }
        
        // Réactiver les contraintes de clé étrangère
        $connection->executeStatement('SET FOREIGN_KEY_CHECKS=1');*/
        
        // $kernel = static::bootKernel();
        // $container = $kernel->getContainer();
        // $entityManager = $container->get(EntityManagerInterface::class);
        // Charger les fixtures
        // $fixtures = new AppFixtures();
        // $fixtures->load($entityManager);

        $fixture = static::getContainer()->get(AppFixtures::class);

        $loader = new Loader();
        //$loader->addFixture(new AppFixtures());
        $loader->addFixture($fixture);

        $purger = new ORMPurger($entityManager);
        $executor = new ORMExecutor($entityManager, $purger);

        $executor->execute($loader->getFixtures());


        /*$this->em->getConnection()->executeStatement('SET FOREIGN_KEY_CHECKS=0');

        $purger = new ORMPurger($this->em);
        $purger->setPurgeMode(ORMPurger::PURGE_MODE_TRUNCATE);
        $executor = new ORMExecutor($this->em, $purger);

        $this->em->getConnection()->executeStatement('SET FOREIGN_KEY_CHECKS=1');

        $executor->execute($loader->getFixtures());*/
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
