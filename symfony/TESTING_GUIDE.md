# Tests API Symfony avec PHPUnit

## Guide d'exécution des tests

Ce projet contient des tests automatisés pour l'API Symfony utilisant PHPUnit.

### Tests disponibles

- **CardApiTest** : Tests pour l'endpoint `/api/cards`
  - `testGetCardsCollection()` : Vérifie que l'endpoint retourne une liste de cards avec la structure correcte
  - `testCardsHaveCorrectStructure()` : Valide la structure des données retournées
  - `testGetActiveCardsCollection()` : Teste l'endpoint `/api/cards_active`
  - `testGetSingleCard()` : Teste la récupération d'une card spécifique par ID
  - `testCardsCollectionPagination()` : Teste la pagination
  - `testCardsCollectionFiltering()` : Teste le filtrage par `isActif`

### Avant de lancer les tests

#### 1. Installation des dépendances

```bash
composer install
```

#### 2. Configuration de la base de données de test

Assurez-vous que la base de données PostgreSQL est accessible. Le fichier `.env.test` contient les configurations :

```
KERNEL_CLASS='App\Kernel'
APP_SECRET='$ecretf0rt3st'
```

#### 3. Créer et charger les fixtures

```bash
# Créer la base de données de test
php bin/console doctrine:database:create --env=test

# Exécuter les migrations (si applicable)
php bin/console doctrine:migrations:migrate --env=test

# Charger les fixtures de test
php bin/console doctrine:fixtures:load --env=test --no-interaction
```

### Exécuter les tests

#### Lancer tous les tests

```bash
php bin/phpunit
```

#### Lancer un fichier de test spécifique

```bash
php bin/phpunit tests/Api/CardApiTest.php
```

#### Lancer un test spécifique

```bash
php bin/phpunit tests/Api/CardApiTest.php::CardApiTest::testGetCardsCollection
```

#### Lancer les tests avec plus de verbosité

```bash
php bin/phpunit --verbose
```

#### Générer un rapport de couverture de code

```bash
php bin/phpunit --coverage-html coverage/
```

### Configuration de Watch Mode (Watcher)

Pour relancer les tests automatiquement lors de modifications :

```bash
# Installation de phpunit-watcher
composer require --dev phpunit-watcher/phpunit-watcher

# Lancer le watcher
./vendor/bin/phpunit-watcher watch
```

### Dépannage

#### Erreur : "Pas de connexion à la base de données"

Assurez-vous que PostgreSQL est en cours d'exécution avec Docker :

```bash
docker-compose up -d
```

#### Erreur : "La base de données de test n'existe pas"

Créez-la avec :

```bash
php bin/console doctrine:database:create --env=test
```

#### Erreur : "Aucune fixture trouvée"

Chargez les fixtures avec :

```bash
php bin/console doctrine:fixtures:load --env=test --no-interaction
```

### Structure des tests

Les tests suivent cette structure :
- **Setup** : Création du client HTTP
- **Exécution** : Appel de l'endpoint via le client
- **Assertions** : Vérification des réponses

### Assertions courantes

- `$this->assertResponseIsSuccessful()` : Vérifie un statut HTTP 2xx ou 3xx
- `$this->assertResponseStatusCodeSame(200)` : Vérifie un statut exact
- `$this->assertResponseHeaderSame('content-type', '...')` : Vérifie les headers
- `$this->assertArrayHasKey()` : Vérifie la présence d'une clé dans un tableau
- `$this->assertIsArray()` : Vérifie le type de donnée

### Ressources

- [Documentation PHPUnit](https://phpunit.readthedocs.io/)
- [Documentation Symfony WebTestCase](https://symfony.com/doc/current/testing.html)
- [API Platform Testing](https://api-platform.com/docs/core/testing/)
