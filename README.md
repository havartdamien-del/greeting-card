# 💌 Greeting Card AI

Application web de création de cartes de vœux avec intelligence artificielle.

## 🎯 Objectif

Fournir une plateforme web complète permettant aux utilisateurs de créer des cartes de vœux personnalisées avec l'aide de l'IA.

## 🏗️ Architecture

```
greeting-card-AI/
├── 📁 specifications/        # Documentation et spécifications
├── 📁 symfony/              # Backend - API Symfony + API Platform
├── 📁 angular/              # Frontend - Application Angular
└── 🐳 docker/               # Infrastructure Docker
```

## 🚀 Démarrage Rapide

### 1️⃣ Cloner le Projet

```bash
git clone <repository>
cd greeting-card-AI
```

### 2️⃣ Configurer les Variables d'Environnement et Démarrer les Services

```bash
cd symfony
cp .env.example .env
```

```bash
cd docker
cp .env.example .env
```

```bash
cd docker
docker compose up -d
```

### 3️⃣ Configurer le Backend Symfony

#### Générer les Clés JWT

```bash
cd docker
docker compose exec php bash

sed -i "s|JWT_SECRET_KEY=CHANGE_ME|JWT_SECRET_KEY=$(openssl rand -base64 32)|" .env

# Générer les clés RSA pour JWT
php bin/console lexik:jwt:generate-keypair
```

#### Exécuter les Migrations et Charger les Fixtures

```bash
cd docker
./manage.sh shell-php

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Charger les fixtures (données d'exemple)
php bin/console doctrine:fixtures:load
```

### 4️⃣ Démarrer les Services

#### Mode Développement
```bash
cd docker
./manage.sh up-dev
```

#### Mode Production
```bash
cd docker
./manage.sh up
```

### 5️⃣ Accéder à l'Application

- 🌐 **Frontend** : http://localhost:4200
- 🔌 **API Backend** : http://localhost:9000
- 📊 **API Docs** : http://localhost:9000/api/docs
- 📦 **MySQL** : localhost:3306

## 📊 Résumé Technique

| Aspect | Technologie |
|--------|-------------|
| **Frontend** | Angular 17+ |
| **Backend** | Symfony 6.x + API Platform |
| **Base de Données** | MySQL 8.0 |
| **Containerization** | Docker + Docker Compose |
| **PHP** | 8.2 |
| **Node** | 22 |

## 🗂️ Structure du Projet

### `/specifications`
Documentation du projet :
- Architecture globale
- Spécifications fonctionnelles
- Guides d'intégration

### `/symfony`
Code source du backend :
- API REST avec API Platform
- Gestion de la base de données (Doctrine)
- Logique métier

**Voir** : `symfony/README.md`

### `/angular`
Code source du frontend :
- Application web interactive
- Composants réutilisables
- Services API

**Voir** : `angular/README.md`

### `/docker`
Infrastructure Docker :
- Dockerfiles pour chaque service
- Configuration des services
- Scripts de gestion
- Fichiers de configuration

**Voir** : `docker/README.md` et `docker/manage.sh`

## 🎮 Commandes Principales

```bash
cd docker

# Démarrage
./manage.sh up           # Mode production
./manage.sh up-dev       # Mode développement

# Arrêt
./manage.sh down

# Logs
./manage.sh logs         # Tous les services
./manage.sh logs-php     # PHP uniquement
./manage.sh logs-ng      # Angular uniquement

# Shell
./manage.sh shell-php    # Accès au conteneur PHP
./manage.sh shell-ng     # Accès au conteneur Angular

# Base de données
./manage.sh db-migrate   # Exécuter les migrations
./manage.sh db-fixtures  # Charger les fixtures

# Plus de commandes
./manage.sh help
```

## 🔄 Mode Développement vs Production

### 🔧 Développement (`docker-compose.dev.yml`)

```
Angular:
  └─ Serveur npm start avec hot reload
PHP:
  └─ Mode debug activé, sources volumisées
MySQL:
  └─ Données persistantes
```

**Démarrage:**
```bash
cd docker
./manage.sh up-dev
```

### 📦 Production (`docker-compose.yml`)

```
Angular:
  └─ Build optimisé servie par Nginx
PHP:
  └─ Mode production, optimisé
MySQL:
  └─ Données persistantes
```

**Démarrage:**
```bash
cd docker
./manage.sh up
```

## 📝 Configuration

### Variables d'Environnement

Éditer `docker/.env` :

```env
# Mode
APP_ENV=dev          # 'dev' ou 'prod'
APP_DEBUG=1          # 0 ou 1

# Base de données
DB_DATABASE=greeting_card
DB_USER=user
DB_PASSWORD=password

# Ports
ANGULAR_PORT=4200
PHP_PORT=9000
MYSQL_PORT=3306
```

## 🔐 Sécurité

### Avant la Production

- ✅ Changer `APP_SECRET` dans `.env`
- ✅ Définir `APP_ENV=prod` et `APP_DEBUG=0`
- ✅ Configurer CORS pour votre domaine
- ✅ Mettre en place HTTPS avec certificats SSL
- ✅ Changer les identifiants MySQL par défaut

## 📚 Documentation Détaillée

- 📖 **Architecture** : Voir `specifications/ARCHITECTURE.md`
- 📖 **Docker** : Voir `docker/README.md`
- 📖 **Symfony** : Voir `symfony/README.md`
- 📖 **Angular** : Voir `angular/README.md`

## 🐛 Troubleshooting

### Les services ne démarrent pas

```bash
cd docker
./manage.sh logs  # Voir tous les logs
```

### Port déjà utilisé

Éditer `docker/.env` et modifier les ports :

```env
ANGULAR_PORT=4201
PHP_PORT=9001
MYSQL_PORT=3307
```

### MySQL ne démarre pas

```bash
cd docker
./manage.sh logs-mysql
# Vérifier les variables d'environnement
```

### Réinitialiser l'environnement

```bash
cd docker
./manage.sh clean    # Supprime les volumes
./manage.sh up-dev   # Redémarre tout
```

## 📊 Monitoring

### État des services

```bash
cd docker
./manage.sh ps
```

### Ressources utilisées

```bash
docker stats
```

### Logs en temps réel

```bash
cd docker
./manage.sh logs -f
```

## 🔗 Ressources

### Documentation Officielle
- [Docker](https://docs.docker.com/)
- [Symfony](https://symfony.com/doc/)
- [Angular](https://angular.io/docs)
- [API Platform](https://api-platform.com/)
- [MySQL](https://dev.mysql.com/doc/)

### Guides
- [Symfony Docker](https://symfony.com/doc/current/setup/docker.html)
- [Angular Docker](https://angular.io/guide/docker)
- [Docker Compose](https://docs.docker.com/compose/)

## 👥 Contribution

1. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
2. Committer les changements (`git commit -m 'Ajout de nouvelle fonctionnalité'`)
3. Pousser la branche (`git push origin feature/nouvelle-fonctionnalite`)
4. Créer une Pull Request

## 📝 License

À définir selon les besoins du projet.

## 📞 Support

Pour toute question ou problème :

1. Consulter la documentation pertinente dans le répertoire `specifications/`
2. Vérifier les logs : `./docker/manage.sh logs`
3. Vérifier les guides : `./docker/README.md`, `./symfony/README.md`, `./angular/README.md`

## ✨ Roadmap

- [ ] Intégration IA pour la génération de contenu
- [ ] Système de templates de cartes
- [ ] Export PDF
- [ ] Partage et collaboration

## 🎉 Merci !

Merci d'utiliser Greeting Card AI !
