# 🐳 Docker - Greeting Card AI

## 📂 Structure du Répertoire

```
docker/
├── mysql/
│   ├── Dockerfile           # Image MySQL 8.0
│   ├── my.cnf              # Configuration MySQL
│   └── init.sql            # Script d'initialisation
├── php/
│   ├── Dockerfile           # Image PHP 8.2 FPM + Symfony
│   ├── php.ini             # Configuration PHP
│   └── php-fpm.conf        # Configuration PHP-FPM
├── angular/
│   └── Dockerfile           # Image Angular (dev & prod)
├── nginx/
│   ├── nginx.conf          # Configuration Nginx principale
│   └── default.conf        # Configuration virtualhost
├── mysql_data/              # 📦 Données MySQL (persistantes)
├── docker-compose.yml       # 🚀 Production
├── docker-compose.dev.yml   # 🔧 Développement
├── .env.example            # Variables d'environnement (exemple)
├── .dockerignore           # Fichiers ignorés dans les builds
├── manage.sh               # 🛠️ Script de gestion
└── README.md               # Ce fichier
```

## 🚀 Démarrage Rapide

### 1. Configuration initiale

```bash
cd docker
cp .env.example .env
chmod +x manage.sh
```

### 2. Démarrer les services

**Mode Développement** (Angular avec npm start, hot reload)
```bash
./manage.sh up-dev
```

**Mode Production** (Angular compilé + Nginx)
```bash
./manage.sh up
```

### 3. Accéder aux services

- **Frontend** : http://localhost:4200
- **API Backend** : http://localhost:9000
- **MySQL** : localhost:3306

## 📋 Commandes Disponibles

```bash
./manage.sh help              # Afficher l'aide complète

# Services
./manage.sh up                # Démarrer (production)
./manage.sh up-dev            # Démarrer (développement)
./manage.sh down              # Arrêter les services
./manage.sh restart           # Redémarrer les services

# Logs
./manage.sh logs              # Tous les logs (temps réel)
./manage.sh logs-php          # Logs PHP uniquement
./manage.sh logs-mysql        # Logs MySQL uniquement
./manage.sh logs-ng           # Logs Angular uniquement

# Gestion des conteneurs
./manage.sh ps                # Lister les conteneurs actifs
./manage.sh build             # Reconstruire les images
./manage.sh build-dev         # Reconstruire les images (dev)

# Shell
./manage.sh shell-php         # Accéder au shell PHP
./manage.sh shell-ng          # Accéder au shell Angular
./manage.sh shell-mysql       # Accéder au shell MySQL

# Base de données
./manage.sh db-migrate        # Exécuter les migrations Doctrine
./manage.sh db-fixtures       # Charger les fixtures Doctrine

# Nettoyage
./manage.sh clean             # Arrêter et supprimer les volumes
./manage.sh prune             # Nettoyer Docker (tout)
```

## 🐳 Images Docker

### Noms et versions

| Service | Image | Version |
|---------|-------|---------|
| MySQL | `greeting-card-mysql` | v1.0.0 |
| PHP/Symfony | `greeting-card-php` | v1.0.0 |
| Angular (Prod) | `greeting-card-angular-prod` | v1.0.0 |
| Angular (Dev) | `greeting-card-angular-dev` | v1.0.0 |

## 🔧 Configuration des Variables d'Environnement

Éditer le fichier `docker/.env` :

```env
# Mode
APP_ENV=dev          # 'dev' ou 'prod'
APP_DEBUG=1          # 1 ou 0
APP_SECRET=secret    # Clé secrète

# MySQL
DB_DATABASE=greeting_card
DB_USER=user
DB_PASSWORD=password
DB_ROOT_PASSWORD=root

# Ports
MYSQL_PORT=3306
PHP_PORT=9000
ANGULAR_PORT=4200

# CORS (pour API Platform)
CORS_ALLOW_ORIGIN=^https?://localhost(:[0-9]+)?$
```

## 🎯 Mode Développement vs Production

### Développement (`docker-compose.dev.yml`)

```
Angular:
├─ Serveur npm start
├─ Hot reload activé
├─ Débuggage en temps réel
├─ Sources volumisées pour édition directe
└─ Port 4200

PHP/Symfony:
├─ APP_DEBUG=1
├─ Sources volumisées
├─ Xdebug configurable
└─ Port 9000

MySQL:
└─ Données persistantes
```

### Production (`docker-compose.yml`)

```
Angular:
├─ Build npm run build
├─ Serveur Nginx
├─ Optimisé et minifié
├─ Gzip activé
├─ Cache configuré
└─ Port 4200

PHP/Symfony:
├─ APP_DEBUG=0
├─ Performance optimisée
├─ Cache Opcache activé
└─ Port 9000

MySQL:
└─ Données persistantes
```

## 📝 Commandes Courantes

### Initialiser la base de données

```bash
# Créer les tables
./manage.sh db-migrate

# Charger des données de test
./manage.sh db-fixtures
```

### Voir les logs en temps réel

```bash
# Tous les services
./manage.sh logs

# Un service spécifique
./manage.sh logs-php
./manage.sh logs-mysql
./manage.sh logs-ng
```

### Accéder aux conteneurs

```bash
# Exécuter des commandes PHP/Symfony
./manage.sh shell-php
php bin/console cache:clear
php bin/console make:entity

# Installer les dépendances NPM
./manage.sh shell-ng
npm install

# Accéder à MySQL
./manage.sh shell-mysql
mysql -u user -p greeting_card
```

## 🔒 Production

### Avant de déployer

1. **Sécurité**
   - Changer `APP_SECRET` dans `.env`
   - Utiliser `APP_ENV=prod`
   - Désactiver `APP_DEBUG`

2. **CORS**
   - Adapter `CORS_ALLOW_ORIGIN` à votre domaine
   - Exemple: `^https?://(www\.)?votredomaine\.com(:[0-9]+)?$`

3. **Certificats SSL**
   - Placer vos certificats dans `nginx/ssl/`
   - Configurer Nginx pour HTTPS

4. **Ressources**
   - Limiter la mémoire MySQL
   - Configurer les limites Docker
   - Configurer Nginx pour la performance

## ⚠️ Troubleshooting

### Port déjà utilisé

```bash
# Modifier les ports dans .env
MYSQL_PORT=3307
PHP_PORT=9001
ANGULAR_PORT=4201
```

### MySQL ne démarre pas

```bash
./manage.sh logs-mysql
# Vérifier les variables d'environnement
```

### Permission denied sur manage.sh

```bash
chmod +x manage.sh
```

### Reconstruire une image après modification

```bash
# Production
./manage.sh build

# Développement
./manage.sh build-dev
```

### Effacer toutes les données et recommencer

```bash
./manage.sh clean
```

## 📊 Monitoring

### Ressources utilisées

```bash
docker stats
```

### Status des services

```bash
./manage.sh ps
```

## 🗑️ Nettoyage

### Arrêter les services et supprimer les volumes

```bash
./manage.sh clean
```

### Nettoyer complètement Docker

```bash
./manage.sh prune
# ⚠️ Attention: supprime aussi d'autres images/conteneurs
```

## 📚 Documentation Supplémentaire

Voir le fichier `../specifications/ARCHITECTURE.md` pour plus de détails sur l'architecture globale du projet.

## 🔗 Ressources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Symfony Docker](https://symfony.com/doc/current/setup/docker.html)
- [Angular Docker](https://angular.io/guide/docker)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [API Platform](https://api-platform.com/)

## 💡 Tips

### Utiliser .env.production pour la production

```bash
cp .env.example .env.production
# Éditer .env.production avec les vrais paramètres
export ENV_FILE=.env.production
docker-compose --env-file $ENV_FILE up
```

### Définir des limites de ressources

Éditer `docker-compose.yml`:

```yaml
services:
  php:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Activer Xdebug

Éditer `docker/php/php.ini` et ajouter votre adresse IP hôte.
