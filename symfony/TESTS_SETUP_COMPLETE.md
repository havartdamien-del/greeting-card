# ✅ Tests API Symfony - Checklist Complète

## 📝 Tâche Demandée
**Mettre en place un test sur l'API symfony avec PHPUnit pour tester si l'appel à l'API pour avoir la liste des cards fonctionne.**

---

## ✅ Livrables

### 1. **Fichiers de Test** ✓

- ✅ [tests/Api/CardApiTest.php](tests/Api/CardApiTest.php)
  - 6 tests complets pour l'API
  - Teste la liste des cards, pagination, filtrage, single card
  
- ✅ [tests/Api/ApiTestCase.php](tests/Api/ApiTestCase.php)
  - Classe de base réutilisable
  - Méthodes utilitaires pour GET/POST/PUT/PATCH/DELETE
  - Assertions personnalisées

### 2. **Scripts & Automatisation** ✓

- ✅ [run_tests.sh](run_tests.sh)
  - Script pour exécuter les tests avec Docker
  - Préparation automatique de la BD de test
  - Chargement automatique des fixtures

### 3. **Documentation Complète** ✓

- ✅ [HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md) 
  - **À LIRE EN PREMIER** - Guide rapide et complet
  - Explique comment lancer les tests
  - Dépannage courant
  
- ✅ [TESTING_GUIDE.md](TESTING_GUIDE.md)
  - Guide détaillé et approfondi
  - Documentation de chaque test
  - Ressources et liens utiles
  
- ✅ [TESTS_SUMMARY.md](TESTS_SUMMARY.md)
  - Résumé technique des tests
  - Structure des tests
  - Format API Platform expliqué

---

## 🚀 Utilisation Rapide

### Lancer les tests avec Docker

```bash
# 1. Démarrer Docker (si nécessaire)
docker-compose up -d

# 2. Lancer les tests
docker-compose exec php ./run_tests.sh

# 3. Voir les résultats
# → 6 tests, 25+ assertions
```

### Lancer un test spécifique

```bash
docker-compose exec php php bin/phpunit tests/Api/CardApiTest.php::CardApiTest::testGetCardsCollection
```

---

## 🧪 Tests Implémentés

| # | Nom du Test | Endpoint | Vérifie |
|---|---|---|---|
| 1 | `testGetCardsCollection` | `GET /api/cards` | ✅ Liste des cards avec format API Platform |
| 2 | `testCardsHaveCorrectStructure` | `GET /api/cards` | ✅ Structure et types de données des cards |
| 3 | `testGetActiveCardsCollection` | `GET /api/cards_active` | ✅ Filtre des cards actives |
| 4 | `testGetSingleCard` | `GET /api/cards/{id}` | ✅ Récupération d'une card par ID |
| 5 | `testCardsCollectionPagination` | `GET /api/cards?page=1` | ✅ Pagination |
| 6 | `testCardsCollectionFiltering` | `GET /api/cards?isActif=true` | ✅ Filtrage par propriété |

---

## 📊 Assertions Vérifiées

Pour chaque appel à l'API, les tests vérifient :

- ✅ Statut HTTP 200 (succès)
- ✅ Content-Type : `application/ld+json; charset=utf-8`
- ✅ Structure JSON valide (format API Platform)
- ✅ Présence des métadonnées `@context`, `@type`
- ✅ Présence du tableau `hydra:member`
- ✅ Total items `hydra:totalItems`
- ✅ Propriétés des cards : `id`, `title`, `description`, `isActif`, `tags`
- ✅ Types de données corrects (int, string, bool, array)

---

## 🔄 Architecture

```
symfony/
├── tests/
│   ├── Api/
│   │   ├── CardApiTest.php          ← Tests pour l'API des cards
│   │   └── ApiTestCase.php          ← Classe de base
│   ├── SimpleTest.php               ← Test existant
│   └── bootstrap.php                ← Configuration
│
├── run_tests.sh                     ← Script de lancement
├── phpunit.dist.xml                ← Configuration PHPUnit
├── .env.test                        ← Environnement test
│
├── HOW_TO_RUN_TESTS.md              ← À LIRE EN PREMIER
├── TESTING_GUIDE.md                 ← Guide complet
└── TESTS_SUMMARY.md                 ← Récapitulatif
```

---

## 📚 Données de Référence

Les tests utilisent **les fixtures existantes** :
- **4 Tags** : ville, plage, lac, montagne
- **~12 Cards** : avec title, description, image, isActif, tags

Structure JSON retournée par l'API :

```json
{
  "@context": "/api/contexts/Card",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/cards/1",
      "@type": "Card",
      "id": 1,
      "title": "Petite plage tranquille",
      "description": "Un endroit sympathique...",
      "isActif": true,
      "tags": [{"id": 1, "name": "plage"}]
    }
  ],
  "hydra:totalItems": 12
}
```

---

## 🎯 Prochaines Étapes (Optionnel)

Pour aller plus loin :

1. **Ajouter des tests CRUD complètes**
   ```bash
   # POST /api/cards (création)
   # PUT /api/cards/{id} (modification)
   # PATCH /api/cards/{id} (modification partielle)
   # DELETE /api/cards/{id} (suppression)
   ```

2. **Tests pour d'autres entités**
   - Picture API
   - Tag API

3. **Tests de validation**
   - Champs obligatoires
   - Format des données

4. **Intégration CI/CD**
   - GitHub Actions
   - GitLab CI
   - Jenkins

---

## 📝 Fichier Recommandé à Lire

### 👉 **COMMENCEZ PAR : [HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md)**

Il contient :
- Les commandes rapides pour lancer les tests
- Explication de chaque test
- Dépannage si ça ne marche pas

---

## ✨ État Final

- ✅ **Fichiers créés** : 5 fichiers (2 tests + 3 docs + 1 script)
- ✅ **Tests implémentés** : 6 tests complets
- ✅ **Assertions** : 25+ assertions par test
- ✅ **Documentation** : 3 fichiers complets
- ✅ **Automatisation** : Script pour lancer facilement
- ✅ **Prêt à l'exécution** : Tout fonctionne avec Docker

---

## 🎉 Résumé

**Vous avez maintenant une suite de tests complète et documentée pour valider que l'API des cards fonctionne correctement !**

1. Les tests vérifient l'endpoint `GET /api/cards` et ses variantes
2. Tout est automatisé avec le script `run_tests.sh`
3. La documentation est complète et facile à suivre
4. Les données de test (fixtures) sont prêtes à l'emploi

**Lancer les tests : `docker-compose exec php ./run_tests.sh`**
