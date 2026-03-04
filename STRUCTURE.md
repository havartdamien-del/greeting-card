# 📋 Structure Complète du Projet

## Arborescence

```
greeting-card-AI/
│
├── 📄 README.md                      # Guide principal du projet
├── 📄 README_DOCKER.md               # Guide Docker détaillé (ancien)
├── 📄 .gitignore                     # Fichiers ignorés par Git
├── 📄 .env.example                   # Variables d'environnement (exemple)
├── 📄 .dockerignore                  # Fichiers ignorés par Docker
│
├── 📁 specifications/                # 📚 Documentation du projet
│   └── 📄 ARCHITECTURE.md            # Architecture complète
│
├── 📁 symfony/                       # 🚀 Backend Symfony + API Platform
│   ├── 📄 README.md                  # Guide Symfony
│   ├── src/                          # Code source (à créer)
│   ├── config/                       # Configuration (à créer)
│   ├── public/                       # Fichiers publics (à créer)
│   ├── migrations/                   # Migrations Doctrine (à créer)
│   ├── composer.json                 # Dépendances PHP (à créer)
│   └── ...
│
├── 📁 angular/                       # 🅰️ Frontend Angular
│   ├── 📄 README.md                  # Guide Angular
│   ├── src/                          # Code source (à créer)
│   ├── angular.json                  # Configuration Angular (à créer)
│   ├── package.json                  # Dépendances npm (à créer)
│   ├── tsconfig.json                 # Configuration TypeScript (à créer)
│   └── ...
│
└── 📁 docker/                        # 🐳 Infrastructure Docker
    │
    ├── 📄 README.md                  # Guide Docker
    ├── 📄 manage.sh                  # 🛠️ Script de gestion Docker
    ├── 📄 .env.example               # Variables d'environnement
    │
    ├── 📄 docker-compose.yml         # Configuration Docker PRODUCTION
    ├── 📄 docker-compose.dev.yml     # Configuration Docker DÉVELOPPEMENT
    │
    ├── 📄 .dockerignore              # Fichiers ignorés par Docker
    │
    │  ❌ ANCIEN (à supprimer)
    ├── 📄 Dockerfile.backend         # Ancien Dockerfile backend
    ├── 📄 Dockerfile.frontend        # Ancien Dockerfile frontend
    │
    ├── 📁 mysql/                     # Configuration MySQL
    │   ├── 📄 Dockerfile             # Image MySQL 8.0
    │   ├── 📄 my.cnf                 # Configuration MySQL
    │   └── 📄 init.sql               # Script d'initialisation
    │
    ├── 📁 mysql_data/                # 📦 Données MySQL (persistantes)
    │   └── 📄 .gitkeep               # Fichier pour garder le dossier
    │
    ├── 📁 php/                       # Configuration PHP/Symfony
    │   ├── 📄 Dockerfile             # Image PHP 8.2 FPM
    │   ├── 📄 php.ini                # Configuration PHP
    │   └── 📄 php-fpm.conf           # Configuration PHP-FPM
    │
    ├── 📁 angular/                   # Configuration Angular
    │   └── 📄 Dockerfile             # Image Angular (dev & prod)
    │
    └── 📁 nginx/                     # Configuration Nginx
        ├── 📄 nginx.conf             # Configuration principale
        ├── 📄 default.conf           # Configuration virtualhost
        └── 📁 ssl/                   # Certificats SSL (à créer)
```

## 📦 Images Docker Créées

### Production
| Nom | Version | Base | Usage |
|-----|---------|------|-------|
| `greeting-card-mysql` | v1.0.0 | mysql:8.0-alpine | Base de données |
| `greeting-card-php` | v1.0.0 | php:8.2-fpm-alpine | Backend Symfony |
| `greeting-card-angular-prod` | v1.0.0 | nginx:alpine | Frontend Angular |

### Développement
| Nom | Version | Base | Usage |
|-----|---------|------|-------|
| `greeting-card-mysql` | v1.0.0 | mysql:8.0-alpine | Base de données |
| `greeting-card-php` | v1.0.0 | php:8.2-fpm-alpine | Backend Symfony |
| `greeting-card-angular-dev` | v1.0.0 | node:20-alpine | Frontend Angular (dev) |

## 🚀 Points d'Entrée

### Script de Gestion Docker
```bash
cd docker
./manage.sh [command]
```

**Commandes principales:**
- `up` - Démarrer (production)
- `up-dev` - Démarrer (développement)
- `down` - Arrêter
- `logs` - Afficher les logs
- `shell-php` - Accès shell PHP
- `db-migrate` - Migrations Doctrine
- `help` - Aide complète

### URLs d'Accès

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:4200 | 4200 |
| API Backend | http://localhost:9000 | 9000 |
| MySQL | localhost:3306 | 3306 |

## 📝 Fichiers de Configuration

### Docker Compose

#### `docker/docker-compose.yml` (Production)
- Angular buildé + Nginx
- Symfony optimisé
- MySQL standard
- Images optimisées

#### `docker/docker-compose.dev.yml` (Développement)
- Angular avec `npm start` (hot reload)
- Symfony avec sources volumisées
- MySQL standard
- Configuration debug

### Variables d'Environnement

#### `docker/.env.example`
- APP_ENV / APP_DEBUG
- DB_DATABASE / DB_USER / DB_PASSWORD
- Ports (MYSQL_PORT, PHP_PORT, ANGULAR_PORT)
- CORS_ALLOW_ORIGIN

### Dockerfiles

#### `docker/mysql/Dockerfile`
- Image MySQL 8.0 Alpine
- Configuration personnalisée
- Scripts d'initialisation

#### `docker/php/Dockerfile`
- Multi-stage build (builder + runtime)
- PHP 8.2 FPM
- Extensions MySQL, PostgreSQL, Zip, Intl, etc.
- Composer inclus
- Configuration Xdebug

#### `docker/angular/Dockerfile`
- Multi-stage build (builder + development + production)
- Node 20 Alpine
- Dev: serveur npm start
- Prod: build + Nginx Alpine

## 📚 Documentation

### Fichiers README

| Fichier | Contenu |
|---------|---------|
| `README.md` | Guide principal du projet |
| `specifications/ARCHITECTURE.md` | Architecture complète et détaillée |
| `docker/README.md` | Guide complet Docker |
| `docker/manage.sh --help` | Aide du script de gestion |
| `symfony/README.md` | Guide backend Symfony |
| `angular/README.md` | Guide frontend Angular |

### Documentation Externe

- [Symfony](https://symfony.com/doc/)
- [API Platform](https://api-platform.com/)
- [Angular](https://angular.io/)
- [Docker](https://docs.docker.com/)
- [MySQL](https://dev.mysql.com/doc/)

## ✅ Statut d'Avancement

### ✨ Créé et Configuré

- ✅ Structure de répertoires
- ✅ Dockerfiles pour tous les services
- ✅ docker-compose.yml (production)
- ✅ docker-compose.dev.yml (développement)
- ✅ Configuration MySQL
- ✅ Configuration PHP/Symfony
- ✅ Configuration Nginx
- ✅ Script de gestion `manage.sh`
- ✅ Documentation complète
- ✅ Variables d'environnement
- ✅ .gitignore et .dockerignore

### 📝 À Créer

- ⏳ Initialiser le projet Symfony
- ⏳ Initialiser le projet Angular
- ⏳ Créer les entités/services
- ⏳ Intégrer l'IA
- ⏳ Tests et validations

## 🎯 Prochaines Étapes

### 1. Initialiser Symfony

```bash
cd docker
./manage.sh shell-php
# ou
docker-compose exec php composer create-project symfony/skeleton .
```

### 2. Initialiser Angular

```bash
cd docker
./manage.sh shell-ng
# ou
docker-compose exec angular ng new . --routing --skip-git
```

### 3. Démarrer le développement

```bash
cd docker
./manage.sh up-dev
```

## 🔗 Commandes Rapides

```bash
# Démarrage
cd docker && ./manage.sh up-dev

# Arrêt
cd docker && ./manage.sh down

# Logs
cd docker && ./manage.sh logs

# Accès shell
cd docker && ./manage.sh shell-php
cd docker && ./manage.sh shell-ng

# Base de données
cd docker && ./manage.sh db-migrate
cd docker && ./manage.sh db-fixtures

# Aide
cd docker && ./manage.sh help
```

## 📞 Support

Consulter les README respectifs dans chaque répertoire:
- `docker/README.md` - Questions Docker
- `symfony/README.md` - Questions Symfony
- `angular/README.md` - Questions Angular
- `specifications/ARCHITECTURE.md` - Architecture générale
