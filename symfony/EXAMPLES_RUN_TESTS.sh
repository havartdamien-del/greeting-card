#!/bin/bash

# 📋 EXEMPLES D'EXÉCUTION DES TESTS
# Cet ensemble de commandes montre comment lancer les tests dans Docker

# ============================================================================
# ✅ MÉTHODE 1 : Utiliser le script automatisé (RECOMMANDÉ)
# ============================================================================

echo "🚀 Méthode 1 : Lancer le script automatisé"
echo "Commande : docker-compose exec php ./run_tests.sh"
echo ""
echo "Ce script va automatiquement :"
echo "  1. Créer la base de données de test"
echo "  2. Exécuter les migrations"
echo "  3. Charger les fixtures (données de test)"
echo "  4. Lancer PHPUnit"
echo ""
echo "Exécution :"
echo "  cd /home/damien/dev/project_greeting_card/greeting-card-AI"
echo "  docker-compose exec php ./run_tests.sh"
echo ""
echo "---"
echo ""

# ============================================================================
# ✅ MÉTHODE 2 : Commandes manuelles étape par étape
# ============================================================================

echo "🚀 Méthode 2 : Étapes manuelles (pour comprendre)"
echo ""
echo "# Étape 1 : Créer la base de données de test"
echo "docker-compose exec php php bin/console doctrine:database:create --env=test --if-not-exists"
echo ""
echo "# Étape 2 : Exécuter les migrations"
echo "docker-compose exec php php bin/console doctrine:migrations:migrate --env=test --no-interaction"
echo ""
echo "# Étape 3 : Charger les fixtures"
echo "docker-compose exec php php bin/console doctrine:fixtures:load --env=test --no-interaction"
echo ""
echo "# Étape 4 : Lancer les tests"
echo "docker-compose exec php php bin/phpunit"
echo ""
echo "---"
echo ""

# ============================================================================
# ✅ MÉTHODE 3 : Lancer un test spécifique
# ============================================================================

echo "🚀 Méthode 3 : Tester un endpoint spécifique"
echo ""
echo "# Tester uniquement testGetCardsCollection"
echo "docker-compose exec php php bin/phpunit tests/Api/CardApiTest.php::CardApiTest::testGetCardsCollection"
echo ""
echo "# Tester le fichier CardApiTest en entier"
echo "docker-compose exec php php bin/phpunit tests/Api/CardApiTest.php"
echo ""
echo "# Tester avec verbose"
echo "docker-compose exec php php bin/phpunit tests/Api/CardApiTest.php --verbose"
echo ""
echo "---"
echo ""

# ============================================================================
# ✅ MÉTHODE 4 : Options avancées
# ============================================================================

echo "🚀 Méthode 4 : Options avancées"
echo ""
echo "# Tous les tests avec couverture"
echo "docker-compose exec php php bin/phpunit --coverage-html coverage/"
echo ""
echo "# Filtrer par nom"
echo "docker-compose exec php php bin/phpunit --filter 'Cards'"
echo ""
echo "# Arrêter au premier failure"
echo "docker-compose exec php php bin/phpunit --fail-on-incomplete"
echo ""
echo "# Afficher plus de détails"
echo "docker-compose exec php php bin/phpunit --debug"
echo ""
echo "---"
echo ""

# ============================================================================
# ✅ MÉTHODE 5 : Vérifier le statut des conteneurs
# ============================================================================

echo "🚀 Méthode 5 : Santé des conteneurs"
echo ""
echo "# Vérifier que tous les services sont en cours d'exécution"
echo "docker-compose ps"
echo ""
echo "# Voir les logs du service PHP"
echo "docker-compose logs php"
echo ""
echo "# Voir les logs en live"
echo "docker-compose logs -f php"
echo ""
echo "---"
echo ""

# ============================================================================
# 📊 CE QUE VOUS VERREZ
# ============================================================================

cat << 'EOF'
📊 RÉSULTAT ATTENDU

Quand le script s'exécute avec succès, vous verrez :

PHPUnit 11.5.x by Sebastian Bergmann and contributors.

Tests/Api/CardApiTest ..... 6 tests passed

Time: 00:02.345, Memory: 12.50 MB

OK (6 tests, 25 assertions)

============================================================================

🎯 LES 6 TESTS QUI S'EXÉCUTENT

1. ✅ testGetCardsCollection
   → Teste GET /api/cards
   → Vérifie le statut 200 et le format JSON API Platform

2. ✅ testCardsHaveCorrectStructure
   → Vérifie que chaque card a les bonnes propriétés
   → title, description, isActif, tags, etc.

3. ✅ testGetActiveCardsCollection
   → Teste GET /api/cards_active
   → Vérifie que seules les cards actives sont retournées

4. ✅ testGetSingleCard
   → Teste GET /api/cards/{id}
   → Récupération d'une carte spécifique

5. ✅ testCardsCollectionPagination
   → Teste GET /api/cards?page=1
   → Vérifie les metadonnées de pagination

6. ✅ testCardsCollectionFiltering
   → Teste GET /api/cards?isActif=true
   → Vérifie le filtrage par propriété

============================================================================

🐛 SI ÇA NE MARCHE PAS

Erreur "Pas de connexion" ?
→ docker-compose up -d
→ docker-compose ps  (vérifier que tout est "Up")

Erreur "Base de données n'existe pas" ?
→ Le script run_tests.sh la crée automatiquement
→ Ou manuellement : docker-compose exec php php bin/console doctrine:database:create --env=test

Erreur "Pas de fixtures" ?
→ docker-compose exec php php bin/console doctrine:fixtures:load --env=test --no-interaction

============================================================================

📚 LIRE AUSSI

- HOW_TO_RUN_TESTS.md      (à lire en premier)
- TESTING_GUIDE.md         (guide complet)
- TESTS_SUMMARY.md         (résumé technique)
- TESTS_SETUP_COMPLETE.md  (checklist complète)

============================================================================
EOF
