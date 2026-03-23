# 🗂️ INDEX DES TESTS API - Navigation

## 📍 Vous êtes ici : Suite de tests pour l'API des cards avec PHPUnit

---

## 🎯 Démarrer Rapidement (30 secondes)

```bash
cd /home/damien/dev/project_greeting_card/greeting-card-AI
docker-compose up -d
docker-compose exec php ./run_tests.sh
```

**Résultat attendu :** `OK (6 tests, 25 assertions)`

---

## 📚 Guide de Navigation Complet

### 👉 **COMMENCEZ ICI**

**`README_TESTS.md`** ⭐ **FIRST READ**
- Résumé de tout ce qui a été créé
- Commandes pour lancer les tests
- Guide rapide de 2 minutes

### 📖 Pour Comprendre Comment Lancer les Tests

1. **`HOW_TO_RUN_TESTS.md`** (5-10 min)
   - Commandes Docker
   - 3 façons de lancer les tests
   - Résultats attendus
   - Dépannage courant
   
   **Lire si :** Vous voulez savoir comment exécuter les tests

### 📋 Pour les Détails Complets

2. **`TESTING_GUIDE.md`** (15-20 min)
   - Documentation technique complète
   - Explication de chaque test
   - Les 6 tests en détail
   - Configuration
   - Ressources
   
   **Lire si :** Vous voulez comprendre chaque ligne de code

3. **`TESTS_SUMMARY.md`** (10-15 min)
   - Résumé technique
   - Architecture des tests
   - Points clés à retenir
   - Prochaines étapes
   
   **Lire si :** Vous voulez une vue d'ensemble technique

4. **`TESTS_SETUP_COMPLETE.md`** (5 min)
   - Checklist de ce qui a été fait
   - Tableau des tests
   - Points vérifiés
   
   **Lire si :** Vous voulez une checklist

### 🔧 Pour les Exemples de Commandes

5. **`EXAMPLES_RUN_TESTS.sh`** (Consulter au besoin)
   - Exemples exacts de commandes
   - À copier-coller directement
   - Explications ligne par ligne
   
   **Consulter si :** Vous avez besoin de commands exactes

---

## 📂 Fichiers Créés

### Tests (2 fichiers)

```
tests/
├── Api/
│   ├── CardApiTest.php          ← 6 tests complets
│   └── ApiTestCase.php          ← Classe de base avec utilitaires
```

### Documentation (5 fichiers)

```
/
├── README_TESTS.md              ← ⭐ START HERE
├── HOW_TO_RUN_TESTS.md          ← Guide d'exécution rapide
├── TESTING_GUIDE.md             ← Guide complet
├── TESTS_SUMMARY.md             ← Résumé technique
├── TESTS_SETUP_COMPLETE.md      ← Checklist complète
└── INDEX_TESTS.md               ← Ce fichier
```

### Scripts (2 fichiers)

```
/
├── run_tests.sh                 ← 🚀 Script automatisé
└── EXAMPLES_RUN_TESTS.sh        ← 📋 Exemples de commandes
```

---

## 🎯 Selon Votre Situation

### Situation 1 : "Je veux juste lancer les tests"

1. Ouvrir : **`README_TESTS.md`**
2. Copier la commande
3. Exécuter

⏱️ **2 minutes**

### Situation 2 : "Je ne sais pas comment ça marche"

1. Commencer par : **`README_TESTS.md`**
2. Continuer avec : **`HOW_TO_RUN_TESTS.md`**
3. Lancer les tests

⏱️ **10 minutes**

### Situation 3 : "Je veux comprendre chaque test"

1. Lire : **`README_TESTS.md`** (overview)
2. Lire : **`TESTING_GUIDE.md`** (détails)
3. Explorer : **`tests/Api/CardApiTest.php`** (code)
4. Explorer : **`tests/Api/ApiTestCase.php`** (base)

⏱️ **30 minutes**

### Situation 4 : "Je veux ajouter d'autres tests"

1. Comprendre : **`TESTING_GUIDE.md`**
2. Consulter : **`tests/Api/ApiTestCase.php`** (méthodes utiles)
3. Copier-coller depuis : **`tests/Api/CardApiTest.php`**
4. Adapter à votre besoin

⏱️ **15-30 minutes par test**

### Situation 5 : "Ça ne marche pas"

1. Consulter : **Section Dépannage de `HOW_TO_RUN_TESTS.md`**
2. Vérifier : Docker en execution (`docker-compose ps`)
3. Consulter : `docker-compose logs php`

⏱️ **5 minutes**

---

## 📊 Vue d'Ensemble des Tests

```
GET /api/cards
    └─ testGetCardsCollection          ✅ 200 OK, JSON valide
    └─ testCardsHaveCorrectStructure   ✅ Propriétés correctes
    └─ testCardsCollectionPagination   ✅ Page=1 marche
    └─ testCardsCollectionFiltering    ✅ Filtre isActif=true

GET /api/cards/{id}
    └─ testGetSingleCard               ✅ Retourne une card

GET /api/cards_active
    └─ testGetActiveCardsCollection    ✅ Seules les actives
```

---

## ✅ Ce Qui a Été Fait

- ✅ **6 tests créés** pour l'API des cards
- ✅ **Classe de base** réutilisable pour ajouter d'autres tests API
- ✅ **Documentation complète** (5 fichiers)
- ✅ **Scripts automatisés** pour lancer facilement
- ✅ **Exemples de commandes** à copier-coller
- ✅ **Prêt à exécuter** immédiatement

---

## 🚀 Commande Unique à Retenir

```bash
docker-compose exec php ./run_tests.sh
```

C'est tout ce que vous devez faire ! ⚡

---

## 💡 Conseils Rapides

- 📍 Tous les fichiers sont dans `/symfony/`
- 📍 Les tests utilisent les fixtures existantes (pas besoin de créer des données)
- 📍 Les fichiers .md sont au format Markdown (lisibles dans tout éditeur)
- 📍 Le script `run_tests.sh` prépare tout automatiquement
- 📍 Les tests prennent ~2 secondes à exécuter

---

## 🎓 Ressources Externes

- [PHPUnit Docs](https://phpunit.readthedocs.io/) - Documentation PHPUnit
- [Symfony Testing](https://symfony.com/doc/current/testing.html) - Guide Symfony
- [API Platform Testing](https://api-platform.com/docs/core/testing/) - Tests API Platform

---

## 🔄 Workflow Type

```
1. Lire README_TESTS.md          (2 min)
2. Lancer ./run_tests.sh         (2 sec)
3. Voir les résultats            (< 1 sec)
4. Modifier mon code             (?)
5. Relancer ./run_tests.sh       (2 sec)
```

**Total par cycle : ~10-15 secondes** ⚡

---

## 📞 Questions Fréquentes

**Q: Comment lancer les tests ?**
A: `docker-compose exec php ./run_tests.sh`

**Q: Ça change quoi si j'utilise mon code ?**
A: Rien ! Les tests fonctionnent contre votre BD de test

**Q: Je peux ajouter d'autres tests ?**
A: Oui ! Voir `TESTING_GUIDE.md` pour des exemples

**Q: Les tests changent les données ?**
A: Non, utilise une BD `app_test` séparée

**Q: Je dois avoir Docker ?**
A: Oui, pour exécuter les tests. Pour dev en local, vous avez déjà Docker

---

## 🎯 Prochaines Étapes

1. **Lancer les tests** : `docker-compose exec php ./run_tests.sh`
2. **Voir qu'ils passent** : ✅ OK (6 tests)
3. **Ajouter vos propres tests** : Copier depuis `CardApiTest.php`
4. **Intégrer en CI/CD** : GitHub Actions, GitLab CI

---

## 📝 Notes

- Tous les fichiers sont documentés et prêts à l'emploi
- Aucune installation supplémentaire n'est nécessaire
- Les tests sont rapides (~2 secondes)
- La BD de test est automatiquement créée et nettoyée

---

**🎉 C'est prêt ! Commencez par : `docker-compose exec php ./run_tests.sh`**
