#!/bin/bash

# Script de gestion des services Docker pour Greeting Card

set -e

DOCKER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$DOCKER_DIR")"
ENV_FILE="$DOCKER_DIR/.env"
ENV_EXAMPLE="$DOCKER_DIR/.env.example"

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ================================
# Fonctions utilitaires
# ================================

print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  ${GREEN}$1${BLUE}${NC}  │"
    echo -e "${BLUE}╚════════════════════════════════════════╝${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# ================================
# Vérifications
# ================================

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé"
        exit 1
    fi
    print_success "Docker est installé"
}

check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose n'est pas installé"
        exit 1
    fi
    print_success "Docker Compose est installé"
}

check_env_file() {
    if [ ! -f "$ENV_FILE" ]; then
        print_info "Création du fichier .env depuis .env.example"
        cp "$ENV_EXAMPLE" "$ENV_FILE"
        print_success "Fichier .env créé"
    fi
}

# ================================
# Commandes
# ================================

cmd_help() {
    echo "Greeting Card Docker Management"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  up          Démarrer les services (production)"
    echo "  up-dev      Démarrer les services (développement)"
    echo "  down        Arrêter les services"
    echo "  restart     Redémarrer les services"
    echo "  logs        Afficher les logs (temps réel)"
    echo "  logs-php    Afficher les logs PHP"
    echo "  logs-mysql  Afficher les logs MySQL"
    echo "  logs-ng     Afficher les logs Angular"
    echo "  ps          Lister les conteneurs actifs"
    echo "  build       Reconstruire les images"
    echo "  build-dev   Reconstruire les images (dev)"
    echo "  shell-php   Accéder au shell PHP"
    echo "  shell-ng    Accéder au shell Angular"
    echo "  shell-mysql Accéder au shell MySQL"
    echo "  db-migrate  Exécuter les migrations Doctrine"
    echo "  db-fixtures Charger les fixtures Doctrine"
    echo "  clean       Nettoyer les conteneurs et images"
    echo "  prune       Nettoyer Docker (toutes les images/conteneurs inutilisés)"
    echo "  help        Afficher cette aide"
    echo ""
}

cmd_up() {
    print_header "Démarrage des services (PRODUCTION)"
    check_docker
    check_docker_compose
    check_env_file
    cd "$DOCKER_DIR"
    docker-compose -f docker-compose.yml up -d
    print_success "Services démarrés"
    echo ""
    echo "URLs d'accès:"
    echo "  Frontend Angular: http://localhost:4200"
    echo "  Backend API: http://localhost:9000"
    echo "  MySQL: localhost:3306"
}

cmd_up_dev() {
    print_header "Démarrage des services (DÉVELOPPEMENT)"
    check_docker
    check_docker_compose
    check_env_file
    cd "$DOCKER_DIR"
    docker-compose -f docker-compose.dev.yml up -d
    print_success "Services démarrés (mode développement)"
    echo ""
    echo "URLs d'accès:"
    echo "  Frontend Angular (dev): http://localhost:4200"
    echo "  Backend API: http://localhost:9000"
    echo "  MySQL: localhost:3306"
}

cmd_down() {
    print_header "Arrêt des services"
    cd "$DOCKER_DIR"
    docker-compose down
    print_success "Services arrêtés"
}

cmd_restart() {
    print_header "Redémarrage des services"
    cd "$DOCKER_DIR"
    docker-compose restart
    print_success "Services redémarrés"
}

cmd_logs() {
    cd "$DOCKER_DIR"
    docker-compose logs -f
}

cmd_logs_php() {
    cd "$DOCKER_DIR"
    docker-compose logs -f php
}

cmd_logs_mysql() {
    cd "$DOCKER_DIR"
    docker-compose logs -f mysql
}

cmd_logs_ng() {
    cd "$DOCKER_DIR"
    docker-compose logs -f angular
}

cmd_ps() {
    cd "$DOCKER_DIR"
    docker-compose ps
}

cmd_build() {
    print_header "Reconstruction des images (PRODUCTION)"
    check_docker
    check_docker_compose
    cd "$DOCKER_DIR"
    docker-compose build --no-cache
    print_success "Images reconstruites"
}

cmd_build_dev() {
    print_header "Reconstruction des images (DÉVELOPPEMENT)"
    check_docker
    check_docker_compose
    cd "$DOCKER_DIR"
    docker-compose -f docker-compose.dev.yml build --no-cache
    print_success "Images reconstruites (dev)"
}

cmd_shell_php() {
    print_info "Connexion au shell PHP..."
    cd "$DOCKER_DIR"
    docker-compose exec php sh
}

cmd_shell_ng() {
    print_info "Connexion au shell Angular..."
    cd "$DOCKER_DIR"
    docker-compose exec angular sh
}

cmd_shell_mysql() {
    print_info "Connexion au shell MySQL..."
    cd "$DOCKER_DIR"
    docker-compose exec mysql sh
}

cmd_db_migrate() {
    print_header "Exécution des migrations Doctrine"
    cd "$DOCKER_DIR"
    docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction
    print_success "Migrations exécutées"
}

cmd_db_fixtures() {
    print_header "Chargement des fixtures Doctrine"
    cd "$DOCKER_DIR"
    docker-compose exec php php bin/console doctrine:fixtures:load --no-interaction
    print_success "Fixtures chargées"
}

cmd_clean() {
    print_header "Nettoyage des conteneurs et images"
    cd "$DOCKER_DIR"
    docker-compose down -v
    print_success "Nettoyage terminé"
}

cmd_prune() {
    print_header "Nettoyage complet Docker"
    print_info "Suppression des images, conteneurs et volumes inutilisés..."
    docker system prune -a --volumes -f
    print_success "Nettoyage Docker terminé"
}

# ================================
# Main
# ================================

if [ $# -eq 0 ]; then
    cmd_help
    exit 0
fi

case "$1" in
    up)
        cmd_up
        ;;
    up-dev)
        cmd_up_dev
        ;;
    down)
        cmd_down
        ;;
    restart)
        cmd_restart
        ;;
    logs)
        cmd_logs
        ;;
    logs-php)
        cmd_logs_php
        ;;
    logs-mysql)
        cmd_logs_mysql
        ;;
    logs-ng)
        cmd_logs_ng
        ;;
    ps)
        cmd_ps
        ;;
    build)
        cmd_build
        ;;
    build-dev)
        cmd_build_dev
        ;;
    shell-php)
        cmd_shell_php
        ;;
    shell-ng)
        cmd_shell_ng
        ;;
    shell-mysql)
        cmd_shell_mysql
        ;;
    db-migrate)
        cmd_db_migrate
        ;;
    db-fixtures)
        cmd_db_fixtures
        ;;
    clean)
        cmd_clean
        ;;
    prune)
        cmd_prune
        ;;
    help)
        cmd_help
        ;;
    *)
        print_error "Commande inconnue: $1"
        echo ""
        cmd_help
        exit 1
        ;;
esac
