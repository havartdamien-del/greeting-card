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

### 2️⃣ Démarrage Automatisé (Recommandé)

```bash
# Rendre le script exécutable
chmod +x start.sh

# Démarrer en mode développement (recommandé)
./start.sh dev

# OU démarrer en mode production
./start.sh prod
```

Le script `start.sh` automatise automatiquement :
- ✅ Configuration des fichiers `.env`
- ✅ Démarrage des services Docker
- ✅ Génération des clés JWT
- ✅ Exécution des migrations
- ✅ Chargement des fixtures (données d'exemple)

### 2️⃣ Alternative : Configuration Manuelle

Si vous préférez configurer manuellement :

```bash
cd symfony
cp .env.example .env
```

```bash
cd docker
cp .env.example .env
docker compose up -d
```

#### Générer les Clés JWT

```bash
cd docker
docker compose exec php bash

# Générer les clés RSA pour JWT
php bin/console lexik:jwt:generate-keypair
```

#### Exécuter les Migrations et Charger les Fixtures

```bash
cd docker
docker compose exec php bash

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Charger les fixtures (données d'exemple)
php bin/console doctrine:fixtures:load
```

### 3️⃣ Accéder à l'Application

- 🌐 **Frontend** : http://localhost:4200
- 🔌 **API Backend** : http://localhost:8080

## 📊 Résumé Technique

| Aspect | Technologie |
|--------|-------------|
| **Frontend** | Angular 21+ |
| **Backend** | Symfony 7.x + API Platform |
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

## 🎉 Merci !

Merci d'utiliser Greeting Card AI !
