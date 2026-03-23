# 🧪 Guide d'Exécution des Tests API - Greeting Card

## Résumé Rapide

Deux fichiers de test créés pour valider que l'API de liste des cards fonctionne :

- **`tests/Api/CardApiTest.php`** - 6 tests complets pour l'API
- **`tests/Api/ApiTestCase.php`** - Classe de base réutilisable pour tests API

## ✨ Fichiers Créés

```
symfony/
├── tests/
│   └── Api/
│       ├── CardApiTest.php         ← Tests pour l'API des cards
│       └── ApiTestCase.php         ← Classe de base pour tests API
├── run_tests.sh                    ← Script pour lancer les tests
├── TESTING_GUIDE.md                ← Guide complet des tests
└── TESTS_SUMMARY.md                ← Ce fichier et récapitulatif
```

## 🚀 Lancer les Tests

### Via Docker (Recommandé)

#### 1. Démarrer les conteneurs
```bash
docker-compose up -d
```

#### 2. Lancer les tests
```bash
# Depuis le répertoire symfony/
docker-compose exec php sh -c './run_tests.sh'

# Ou directement avec PHPUnit
docker-compose exec php php bin/phpunit
```

#### 3. Lancer un test spécifique
```bash
docker-compose exec php php bin/phpunit tests/Api/CardApiTest.php::CardApiTest::testGetCardsCollection
```

#### 4. Lancer avec options
```bash
docker-compose exec php php bin/phpunit --verbose
docker-compose exec php php bin/phpunit --filter "Cards"
docker-compose exec php php bin/phpunit --coverage-html coverage/
```

### En Local (si PHP 8.2+ installé)

```bash
cd symfony/
./run_tests.sh
```

## 📋 Tests Disponibles

### 1. **testGetCardsCollection()**
✅ Teste l'endpoint `GET /api/cards`
- Vérifie le statut HTTP 200
- Valide le format JSON API Platform
- Confirme la présence des metadonnées (member, totalItems)

### 2. **testCardsHaveCorrectStructure()**
✅ Valide la structure des données des cards
- Vérifie les propriétés : id, title, description, isActif, tags
- Valide les types de données

### 3. **testGetActiveCardsCollection()**
✅ Teste l'endpoint `GET /api/cards_active`
- Retourne seulement les cards actives
- Vérifie le filtre `isActif=true`

### 4. **testGetSingleCard()**
✅ Teste la récupération d'une card par ID
- Format : `GET /api/cards/{id}`
- Valide les données retournées

### 5. **testCardsCollectionPagination()**
✅ Teste la pagination
- Endpoint : `GET /api/cards?page=1`
- Vérifie les metadonnées de pagination (hydra:view)

### 6. **testCardsCollectionFiltering()**
✅ Teste le filtrage par propriété
- Endpoint : `GET /api/cards?isActif=true`
- Vérifie que seules les cards actives sont retournées

## 📊 Résultats Attendus

Quand vous lancez les tests, vous devriez voir :

```
PHPUnit 11.5.x by Sebastian Bergmann and contributors.

Tests/Api/CardApiTest ..... 6 tests passed (6 assertions)

Time: 00:02.345, Memory: 12.50 MB

OK (6 tests, 25 assertions)
```

## ⚙️ Configuration Automatique

Le script `run_tests.sh` automatise :

1. ✅ Création de la base de données de test
2. ✅ Exécution des migrations
3. ✅ Chargement des fixtures (données de test)
4. ✅ Lancement de PHPUnit

## 🔍 Données de Test

Les tests utilisent les fixtures existantes dans `src/DataFixtures/AppFixtures.php` :
- 4 tags : ville, plage, lac, montagne
- ~12 cards avec descriptions et images
- Statut d'activité (isActif)

## 📚 Structure d'une Réponse API

```json
{
  "@context": "/api/contexts/Card",
  "@type": "hydra:Collection",
  "member": [
    {
      "@id": "/api/cards/1",
      "@type": "Card",
      "id": 1,
      "title": "Petite plage tranquille",
      "description": "Un endroit sympathique...",
      "isActif": true,
      "tags": [
        {
          "@id": "/api/tags/1",
          "@type": "Tag",
          "id": 1,
          "name": "plage"
        }
      ]
    }
  ],
  "totalItems": 12,
  "hydra:view": {
    "@id": "/api/cards?page=1",
    "@type": "hydra:PartialCollectionView",
    "hydra:first": "/api/cards?page=1",
    "hydra:last": "/api/cards?page=1"
  }
}
```

## 🐛 Dépannage

### Erreur : "Pas de connexion à la base de données"
```bash
docker-compose up -d
docker-compose ps  # Vérifier que tous les services sont up
```

### Erreur : "La base de données de test n'existe pas"
Le script `run_tests.sh` la crée automatiquement, mais sinon :
```bash
docker-compose exec php php bin/console doctrine:database:create --env=test
```

### Erreur : "Aucune fixture trouvée"
```bash
docker-compose exec php php bin/console doctrine:fixtures:load --env=test --no-interaction
```

### Les tests s'exécutent mais échouent
1. Vérifier que les fixture sont bien chargées
2. Vérifier les logs du conteneur :
```bash
docker-compose logs php
```

## 📖 Documentation Complète

- **TESTING_GUIDE.md** - Guide détaillé de tous les tests
- **TESTS_SUMMARY.md** - Résumé complet
- **README.md** - Documentation générale du projet

## 🎯 Prochaines Étapes

Vous pouvez maintenant :

1. ✅ Ajouter des tests pour POST, PUT, PATCH, DELETE
2. ✅ Créer des tests pour les entités Picture et Tag
3. ✅ Ajouter des tests de validation
4. ✅ Intégrer les tests en CI/CD (GitHub Actions, GitLab CI)

## 📞 Commandes Utiles SSH/Docker

```bash
# Exécuter PHPUnit
docker-compose exec php php bin/phpunit

# Exécuter avec le script
docker-compose exec php ./run_tests.sh

# Exécuter un test spécifique
docker-compose exec php php bin/phpunit tests/Api/CardApiTest.php

# Générer rapport de couverture
docker-compose exec php php bin/phpunit --coverage-html coverage/

# Nettoyer l'environnement de test
docker-compose exec php php bin/console doctrine:database:drop --env=test --force
docker-compose exec php php bin/console doctrine:database:create --env=test
docker-compose exec php php bin/console doctrine:migrations:migrate --env=test
docker-compose exec php php bin/console doctrine:fixtures:load --env=test --no-interaction
```

---

**C'est prêt ! 🎉** Vous avez maintenant une suite de tests complète pour valider que l'API des cards fonctionne correctement.
