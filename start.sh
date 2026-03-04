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

if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose n'est pas installé${NC}"
    exit 1
fi

# Créer le fichier .env s'il n'existe pas
if [ ! -f "$DOCKER_DIR/.env" ]; then
    echo -e "${BLUE}📝 Création du fichier .env...${NC}"
    cp "$DOCKER_DIR/.env.example" "$DOCKER_DIR/.env"
    echo -e "${GREEN}✓ Fichier .env créé${NC}\n"
fi

# Rendre manage.sh exécutable
chmod +x "$DOCKER_DIR/manage.sh"

# Démarrer les services
echo -e "${BLUE}🚀 Démarrage des services en mode ${MODE}...${NC}\n"

if [ "$MODE" = "dev" ]; then
    cd "$DOCKER_DIR"
    ./manage.sh up-dev
    echo -e "\n${GREEN}✓ Services démarrés en mode DÉVELOPPEMENT${NC}"
    echo -e "\n${YELLOW}URLs d'accès:${NC}"
    echo "  🌐 Frontend Angular : http://localhost:4200"
    echo "  🔌 API Backend     : http://localhost:9000"
    echo "  📊 API Docs        : http://localhost:9000/api/docs"
    echo "  📦 MySQL           : localhost:3306"
else
    cd "$DOCKER_DIR"
    ./manage.sh up
    echo -e "\n${GREEN}✓ Services démarrés en mode PRODUCTION${NC}"
    echo -e "\n${YELLOW}URLs d'accès:${NC}"
    echo "  🌐 Frontend Angular : http://localhost:4200"
    echo "  🔌 API Backend     : http://localhost:9000"
    echo "  📊 API Docs        : http://localhost:9000/api/docs"
    echo "  📦 MySQL           : localhost:3306"
fi

echo -e "\n${BLUE}💡 Commandes utiles:${NC}"
echo "  ./docker/manage.sh logs      # Afficher les logs"
echo "  ./docker/manage.sh down      # Arrêter les services"
echo "  ./docker/manage.sh help      # Voir toutes les commandes"
echo ""
