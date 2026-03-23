#!/bin/bash

# Script pour lancer les tests PHPUnit avec préparation automatique

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Préparation de l'environnement de test ===${NC}\n"

# Vérifier que composer.json existe
if [ ! -f "composer.json" ]; then
    echo -e "${RED}Erreur: composer.json non trouvé${NC}"
    exit 1
fi

# 1. Créer la base de données de test
echo -e "${YELLOW}1. Création de la base de données de test...${NC}"
php bin/console doctrine:database:create --env=test --if-not-exists 2>/dev/null || true
echo -e "${GREEN}   ✓ Base de données de test créée (ou existante)${NC}\n"

# 2. Exécuter les migrations
echo -e "${YELLOW}2. Exécution des migrations...${NC}"
php bin/console doctrine:migrations:migrate --env=test --no-interaction 2>/dev/null || true
echo -e "${GREEN}   ✓ Migrations exécutées${NC}\n"

# 3. Charger les fixtures
echo -e "${YELLOW}3. Chargement des fixtures...${NC}"
php bin/console doctrine:fixtures:load --env=test --no-interaction --quiet
echo -e "${GREEN}   ✓ Fixtures chargées${NC}\n"

# 4. Lancer les tests PHPUnit
echo -e "${BLUE}=== Lancement des tests ===${NC}\n"

# Accepter les arguments passés au script (ex: --filter, --verbose)
php bin/phpunit "$@"

echo -e "\n${GREEN}=== Tests terminés ===${NC}"
