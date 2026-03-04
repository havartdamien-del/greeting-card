# Greeting Card Project - Spécifications

## 📋 Vue d'ensemble

Ce projet est une application de création de cartes de vœux avec IA. Il est composé de trois parties principales :

- **Frontend** : Interface utilisateur Angular
- **Backend** : API REST Symfony + API Platform
- **Database** : MySQL 8.0

## 🏗️ Architecture du Projet

```
greeting-card-AI/
├── specifications/          # Documentation et spécifications du projet
├── symfony/                 # Code source backend
│   ├── src/
│   ├── config/
│   ├── public/
│   ├── composer.json
│   └── ...
├── angular/                 # Code source frontend
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
└── docker/                  # Configuration Docker
    ├── mysql/               # Configuration MySQL
    │   ├── Dockerfile
    │   ├── my.cnf
    │   └── init.sql
    ├── php/                 # Configuration PHP/Symfony
    │   ├── Dockerfile
    │   ├── php.ini
    │   └── php-fpm.conf
    ├── angular/             # Configuration Angular
    │   └── Dockerfile
    ├── nginx/               # Configuration Nginx
    │   ├── nginx.conf
    │   └── default.conf
    ├── mysql_data/          # Données persistantes MySQL
    ├── docker-compose.yml   # Configuration production
    ├── docker-compose.dev.yml  # Configuration développement
    ├── .env.example         # Variables d'environnement (exemple)
    ├── manage.sh            # Script de gestion Docker
    └── .dockerignore        # Fichiers ignorés
```

## 🐳 Images Docker

### Production
- `greeting-card-mysql-v1.0.0` : MySQL 8.0
- `greeting-card-php-v1.0.0` : PHP 8.2 FPM + Symfony
- `greeting-card-angular-prod-v1.0.0` : Angular + Nginx

### Développement
- `greeting-card-mysql-v1.0.0` : MySQL 8.0
- `greeting-card-php-v1.0.0` : PHP 8.2 FPM + Symfony
- `greeting-card-angular-dev-v1.0.0` : Angular dev server (npm start)

## 🚀 Démarrage Rapide

### 1. Initialisation

```bash
cd docker
cp .env.example .env
chmod +x manage.sh
```

### 2. Démarrage en développement

```bash
./manage.sh up-dev
```

### 3. Démarrage en production

```bash
./manage.sh up
```

## 🎯 Fonctionnalités par Mode

### Mode Développement (docker-compose.dev.yml)

- **Angular** : Serveur de développement `npm start` (port 4200)
  - Hot reload activé
  - Sources volumisées
  - Débuggage facile

- **Symfony** : PHP-FPM (port 9000)
  - Mode debug activé (APP_DEBUG=1)
  - Sources volumisées
  - Xdebug configurable

- **MySQL** : Service standard avec données persistantes

### Mode Production (docker-compose.yml)

- **Angular** : Application buildée + servie par Nginx (port 4200)
  - Optimisée et minifiée
  - Compression Gzip activée
  - Cache configuré

- **Symfony** : PHP-FPM (port 9000)
  - Mode production (APP_DEBUG=0)
  - Performance optimisée

- **MySQL** : Service standard avec données persistantes

## 📝 Commandes Utiles

Voir `./manage.sh help` pour la liste complète.

```bash
# Démarrage
./manage.sh up        # Production
./manage.sh up-dev    # Développement

# Arrêt
./manage.sh down

# Logs
./manage.sh logs      # Tous les services
./manage.sh logs-php  # Uniquement PHP
./manage.sh logs-mysql
./manage.sh logs-ng

# Shell dans les conteneurs
./manage.sh shell-php
./manage.sh shell-ng
./manage.sh shell-mysql

# Base de données
./manage.sh db-migrate    # Exécuter les migrations
./manage.sh db-fixtures   # Charger les fixtures

# Nettoyage
./manage.sh clean     # Arrêt et suppression des volumes
./manage.sh prune     # Nettoyage global Docker
```

## 🔧 Configuration des Variables d'Environnement

Éditer `docker/.env` :

```env
# Environment: dev ou prod
APP_ENV=dev
APP_DEBUG=1
APP_SECRET=dev-secret-key

# MySQL
DB_DATABASE=greeting_card
DB_USER=user
DB_PASSWORD=password
DB_ROOT_PASSWORD=root

# Ports
MYSQL_PORT=3306
PHP_PORT=9000
ANGULAR_PORT=4200

# CORS
CORS_ALLOW_ORIGIN=^https?://localhost(:[0-9]+)?$
```

## 📊 Services et Ports

### Développement
- Frontend Angular : `http://localhost:4200`
- Backend API : `http://localhost:9000`
- MySQL : `localhost:3306`

### Production
- Frontend Angular : `http://localhost:4200`
- Backend API : `http://localhost:9000`
- MySQL : `localhost:3306`

## 🔐 Sécurité

### Production
- Toujours changer `APP_SECRET` dans `.env`
- Utiliser `APP_ENV=prod` et `APP_DEBUG=0`
- Configurer CORS correctement : `CORS_ALLOW_ORIGIN=^https?://votre-domaine\\.com(:[0-9]+)?$`
- Utiliser des certificats SSL pour Nginx

### Développement
- Xdebug configurable dans `docker/php/php.ini`
- Mode debug activé
- CORS ouvert pour localhost

## 📦 Technologies

### Backend
- **Framework** : Symfony 6.x
- **API** : API Platform
- **Database** : Doctrine ORM + MySQL 8.0
- **PHP** : 8.2

### Frontend
- **Framework** : Angular 17+
- **Build** : Node 20 + npm
- **Server** : Nginx Alpine

### Infrastructure
- **Containerization** : Docker + Docker Compose
- **Images** : Alpine pour la légèreté

## 🐛 Troubleshooting

### Permission denied on manage.sh
```bash
chmod +x docker/manage.sh
```

### MySQL ne démarre pas
```bash
./manage.sh logs-mysql
# Vérifier les variables d'environnement dans .env
```

### Port déjà utilisé
```bash
# Modifier les ports dans .env
MYSQL_PORT=3307
PHP_PORT=9001
ANGULAR_PORT=4201
```

### Reconstruire une image
```bash
# Production
./manage.sh build

# Développement
./manage.sh build-dev
```

## 📚 Documentation Additionnelle

- [Symfony Docker Guide](https://symfony.com/doc/current/setup/docker.html)
- [Angular Docker Guide](https://angular.io/guide/docker)
- [API Platform Documentation](https://api-platform.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## ✅ Checklist de Mise en Production

- [ ] Créer un fichier `.env` sécurisé (ne pas committer)
- [ ] Définir `APP_ENV=prod` et `APP_DEBUG=0`
- [ ] Générer une nouvelle `APP_SECRET`
- [ ] Configurer les certificats SSL pour Nginx
- [ ] Mettre à jour `CORS_ALLOW_ORIGIN` avec votre domaine
- [ ] Configurer une stratégie de backup MySQL
- [ ] Tester toutes les fonctionnalités
- [ ] Configurer les limites de ressources dans docker-compose.yml
- [ ] Mettre en place un système de monitoring

## 📞 Support

Pour toute question ou problème, consulter la documentation appropriée ou les logs :

```bash
./manage.sh logs
```
