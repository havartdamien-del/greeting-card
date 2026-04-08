#!/bin/bash

# Script de démarrage rapide pour Greeting Card AI
# Utilisation: ./start.sh [dev|prod]

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_DIR="$PROJECT_ROOT/docker"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════╗"
echo "║  🎉 Greeting Card AI - Démarrage Rapide    ║"
echo "╚════════════════════════════════════════════╝"
echo -e "${NC}\n"

# Déterminer le mode
MODE=${1:-dev}

if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ]; then
    echo -e "${YELLOW}Usage: ./start.sh [dev|prod]${NC}"
    echo ""
    echo "dev  - Mode développement (Angular avec npm start, hot reload)"
    echo "prod - Mode production (Angular compilé, Nginx)"
    echo ""
    exit 1
fi

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker n'est pas installé${NC}"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose n'est pas installé${NC}"
    exit 1
fi

# Créer le fichier .env pour Symfony s'il n'existe pas
SYMFONY_DIR="$PROJECT_ROOT/symfony"
if [ ! -f "$SYMFONY_DIR/.env" ]; then
    echo -e "${BLUE}📝 Création du fichier .env Symfony...${NC}"
    if [ -f "$SYMFONY_DIR/.env.local" ]; then
        cp "$SYMFONY_DIR/.env.local" "$SYMFONY_DIR/.env"
    else
        cp "$SYMFONY_DIR/.env.example" "$SYMFONY_DIR/.env"
    fi
    echo -e "${GREEN}✓ Fichier .env Symfony créé${NC}\n"
fi

# Créer le fichier .env pour Docker s'il n'existe pas
if [ ! -f "$DOCKER_DIR/.env" ]; then
    echo -e "${BLUE}📝 Création du fichier .env Docker...${NC}"
    cp "$DOCKER_DIR/.env.example" "$DOCKER_DIR/.env"
    echo -e "${GREEN}✓ Fichier .env Docker créé${NC}\n"
fi

# Rendre manage.sh exécutable
chmod +x "$DOCKER_DIR/manage.sh"

# Démarrer les services
echo -e "${BLUE}🚀 Démarrage des services en mode ${MODE}...${NC}\n"

if [ "$MODE" = "dev" ]; then
    cd "$DOCKER_DIR"
    ./manage.sh up-dev
    echo -e "\n${GREEN}✓ Services démarrés en mode DÉVELOPPEMENT${NC}"
else
    cd "$DOCKER_DIR"
    ./manage.sh up
    echo -e "\n${GREEN}✓ Services démarrés en mode PRODUCTION${NC}"
fi

# Attendre que les services soient prêts
echo -e "\n${BLUE}⏳ Attente du démarrage des services (30 secondes)...${NC}"
sleep 30

# Générer les clés JWT
echo -e "\n${BLUE}🔐 Génération des clés JWT...${NC}"
if docker compose -f "$DOCKER_DIR/docker-compose.yml" exec -T php bash -c "php bin/console lexik:jwt:generate-keypair --overwrite --no-interaction" 2>/dev/null; then
    echo -e "${GREEN}✓ Clés JWT générées${NC}\n"
else
    echo -e "${YELLOW}⚠️  Les clés JWT existent déjà ou JWT n'est pas activé${NC}\n"
fi

# Exécuter les migrations
echo -e "${BLUE}📦 Exécution des migrations de base de données...${NC}"
if docker compose -f "$DOCKER_DIR/docker-compose.yml" exec -T php bash -c "php bin/console doctrine:migrations:migrate --no-interaction" 2>/dev/null; then
    echo -e "${GREEN}✓ Migrations exécutées${NC}\n"
else
    echo -e "${YELLOW}⚠️  Impossible d'exécuter les migrations${NC}\n"
fi

# Charger les fixtures
echo -e "${BLUE}🌱 Chargement des fixtures (données d'exemple)...${NC}"
if docker compose -f "$DOCKER_DIR/docker-compose.yml" exec -T php bash -c "php bin/console doctrine:fixtures:load --no-interaction" 2>/dev/null; then
    echo -e "${GREEN}✓ Fixtures chargées${NC}\n"
else
    echo -e "${YELLOW}⚠️  Impossible de charger les fixtures${NC}\n"
fi

echo -e "\n${YELLOW}URLs d'accès:${NC}"
echo "  🌐 Frontend Angular : http://localhost:4200"
echo "  🔌 API Backend     : http://localhost:8080"


echo -e "\n${BLUE}💡 Commandes utiles:${NC}"
echo "  ./docker/manage.sh logs      # Afficher les logs"
echo "  ./docker/manage.sh down      # Arrêter les services"
echo "  ./docker/manage.sh help      # Voir toutes les commandes"
echo ""
