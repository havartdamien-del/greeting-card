# Résumé des Tests API - Greeting Card Application

## ✅ Ce qui a été mis en place

### 1. **Fichiers de Test Créés**

#### `tests/Api/CardApiTest.php`
Test principal pour l'API des cards. Contient les tests suivants :

- ✅ **testGetCardsCollection()** 
  - Test de l'endpoint GET `/api/cards`
  - Vérifie le statut HTTP 200
  - Valide la structure JSON (format API Platform avec hydra)
  - Vérifie la présence des clés `@context`, `@type`, `hydra:member`, `hydra:totalItems`

- ✅ **testCardsHaveCorrectStructure()**
  - Valide la structure d'une card dans la collection
  - Vérifie les propriétés : `id`, `title`, `description`, `isActif`, `tags`
  - Valide les types de données

- ✅ **testGetActiveCardsCollection()**
  - Test de l'endpoint GET `/api/cards_active`
  - Vérifie que seules les cards actives (`isActif=true`) sont retournées

- ✅ **testGetSingleCard()**
  - Test de la récupération d'une card spécifique par ID
  - Endpoint : GET `/api/cards/{id}`

- ✅ **testCardsCollectionPagination()**
  - Test de la pagination sur `/api/cards?page=1`
  - Vérifie la présence des métadonnées de pagination

- ✅ **testCardsCollectionFiltering()**
  - Test du filtrage par propriété `isActif`
  - Endpoint : GET `/api/cards?isActif=true`

#### `tests/Api/ApiTestCase.php`
Classe de base pour tous les tests API. Offre des méthodes utilitaires :

- `getJson($url)` - Effectue une requête GET et retourne JSON décodé
- `postJson($url, $data)` - POST avec données JSON
- `putJson($url, $data)` - PUT avec données JSON
- `patchJson($url, $data)` - PATCH avec données JSON
- `deleteJson($url)` - DELETE
- `assertIsValidJsonResponse()` - Vérifie les headers JSON
- `assertIsValidJsonCollectionResponse()` - Valide une collection API Platform
- `assertHasCardProperties($card)` - Valide les propriétés d'une card

### 2. **Documentation Créée**

#### `TESTING_GUIDE.md`
Guide complet pour exécuter les tests :
- Instructions d'installation
- Configuration de la base de données de test
- Commandes pour lancer les tests
- Options et configurations avancées
- Dépannage courant

### 3. **Script Automatisé**

#### `run_tests.sh`
Script bash qui automatise la préparation et l'exécution des tests :

```bash
./run_tests.sh                    # Lancer tous les tests
./run_tests.sh --verbose          # Avec plus de détails
./run_tests.sh --filter CardApi   # Tester CardApi uniquement
```

Le script effectue automatiquement :
1. Création de la base de données de test
2. Exécution des migrations
3. Chargement des fixtures (données de test)
4. Lancement de PHPUnit

## 🚀 Utilisation Rapide

### Première exécution (avec préparation complète)
```bash
cd symfony
./run_tests.sh
```

### Exécutions suivantes
```bash
./run_tests.sh
```

### Lancer un test spécifique
```bash
./run_tests.sh --filter testGetCardsCollection
```

### Lancer avec verbose
```bash
./run_tests.sh --verbose
```

## 📋 Prérequis

- ✅ PHP 8.2+
- ✅ Composer (packages installés)
- ✅ PostgreSQL (en exécution dans Docker)
- ✅ PHPUnit (déjà configuré)
- ✅ Doctrine (pour ORM et fixtures)

## 🔍 Points Clés des Tests

### Format API Platform
Les tests vérifient le format JSON-LD standard d'API Platform :
```json
{
  "@context": "/api/contexts/Card",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/cards/1",
      "@type": "Card",
      "id": 1,
      "title": "Mon Card",
      "description": "Description",
      "isActif": true,
      "tags": []
    }
  ],
  "hydra:totalItems": 10,
  "hydra:view": { ... }
}
```

### Fixtures Disponibles
Les tests utilisent les fixtures existantes dans `src/DataFixtures/AppFixtures.php` :
- 4 tags (ville, plage, lac, montagne)
- ~12 cards avec descriptions

### Assertions Principales
- Statut HTTP 200 (succès)
- Content-Type : `application/ld+json; charset=utf-8`
- Structure JSON valide avec hydra
- Propriétés et types de données corrects

## 📊 Structure des Tests

```
tests/
├── Api/
│   ├── ApiTestCase.php          # Classe de base pour tests API
│   └── CardApiTest.php          # Tests pour l'API des cards
├── SimpleTest.php                # Test simple existant
└── bootstrap.php                 # Configuration PHPUnit
```

## ⚙️ Configuration Appliquée

### PhpUnit (`phpunit.dist.xml`)
- Environnement : test
- Bootstrap : tests/bootstrap.php
- Testsuites : tests/
- Couverage source : src/

### Base de données de test (`.env.test`)
- Base : `app_test` (suffixe `_test`)
- Utilisateur : app
- Mot de passe : !ChangeMe!
- PostgreSQL sur localhost:5432

## 🎯 Prochaines Étapes Possibles

1. **Ajouter d'autres tests API**
   - Tests POST/PUT/PATCH/DELETE
   - Tests de validation
   - Tests d'authentification

2. **Améliorer la couverture**
   - Tests d'autres entités (Picture, Tag)
   - Tests des repositories
   - Tests des services métier

3. **Intégration continue**
   - Exécuter automatiquement sur chaque commit
   - Générer des rapports de couverture
   - GitHub Actions ou GitLab CI

## 📞 Support

Pour plus d'informations :
- Consulter `TESTING_GUIDE.md`
- Documentation PHPUnit : https://phpunit.readthedocs.io/
- Documentation Symfony Testing : https://symfony.com/doc/current/testing.html
- API Platform Testing : https://api-platform.com/docs/core/testing/
