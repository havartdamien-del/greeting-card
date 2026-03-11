# 🚀 Initialisation Symfony - Greeting Card AI

## ✅ Structure Créée

```
symfony/
├── src/
│   ├── Controller/
│   │   ├── WelcomeController.php   # Contrôleur de bienvenue
│   │   └── HealthController.php    # Health check
│   ├── Entity/                     # Entités Doctrine (à créer)
│   ├── Repository/                 # Repositories (à créer)
│   ├── Service/                    # Services métier (à créer)
│   └── Kernel.php                  # Kernel Symfony
├── config/
│   ├── bundles.php                 # Configuration des bundles
│   ├── services.yaml               # Configuration des services
│   ├── routes.yaml                 # Configuration des routes
│   └── packages/                   # Configuration par package
│       ├── api_platform.yaml       # Configuration API Platform
│       ├── doctrine.yaml           # Configuration Doctrine ORM
│       ├── nelmio_cors.yaml        # Configuration CORS
│       ├── twig.yaml               # Configuration Twig
│       └── doctrine_migrations.yaml # Configuration Migrations
├── public/
│   ├── index.php                   # Point d'entrée
│   └── .htaccess                   # Configuration Apache
├── bin/
│   ├── console                     # CLI Symfony
│   └── phpunit                     # Test runner
├── migrations/                     # Migrations Doctrine
├── tests/
│   └── Controller/
│       └── WelcomeControllerTest.php # Tests unitaires
├── var/                            # Cache, logs, uploads
├── .env                            # Variables développement
├── .env.prod                       # Variables production
├── composer.json                   # Dépendances PHP
└── README.md                       # Ce fichier
```

## 🌐 Endpoints Disponibles

### Endpoint de Bienvenue
```
GET /
```

Réponse :
```json
{
  "status": "success",
  "message": "💌 Bienvenue sur l'API Greeting Card AI!",
  "version": "1.0.0",
  "description": "Créez vos cartes de vœux avec l'intelligence artificielle",
  "endpoints": {
    "docs": "/api/docs",
    "api": "/api",
    "health": "/health"
  },
  "timestamp": "2026-03-04 16:30:00"
}
```

### Endpoint de Santé
```
GET /health
```

Réponse :
```json
{
  "status": "healthy",
  "timestamp": "2026-03-04 16:30:00",
  "environment": "dev"
}
```

### API Docs (Swagger UI)
```
GET /api/docs
```

## 🚀 Démarrage

### Via Docker

```bash
cd docker
./manage.sh up-dev
```

L'API sera accessible sur http://localhost:9000

### Localement

```bash
cd symfony

# Installer les dépendances
composer install

# Créer la base de données
php bin/console doctrine:database:create

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Démarrer le serveur
php -S 127.0.0.1:8000 -t public
```

## 📦 Bundles Configurés

- ✅ **FrameworkBundle** - Core Symfony
- ✅ **TwigBundle** - Template engine
- ✅ **DoctrineBundle** - ORM
- ✅ **DoctrineMigrationsBundle** - Migrations
- ✅ **NelmioCorsBundle** - CORS handling
- ✅ **ApiPlatformBundle** - REST API generation

## 🔧 Configuration

### Variables d'Environnement

**Development** (`.env`) :
```env
APP_ENV=dev
APP_DEBUG=1
DATABASE_URL=mysql://user:password@mysql:3306/greeting_card
CORS_ALLOW_ORIGIN=^https?://localhost(:[0-9]+)?$
```

**Production** (`.env.prod`) :
```env
APP_ENV=prod
APP_DEBUG=0
```

### Configuration CORS

CORS est configuré pour autoriser localhost :

```yaml
nelmio_cors:
  paths:
    '^/api':
      allow_origin: ['*']
      allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
```

### Configuration API Platform

API Platform est automatiquement activé et génère :
- Documentation Swagger : `/api/docs`
- OpenAPI JSON : `/api/openapi.json`
- Routes CRUD automatiques pour les entités

## 🗄️ Base de Données

### Migrations

Créer une migration après modification des entités :

```bash
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate
```

### Fixtures

Charger des données de test :

```bash
php bin/console doctrine:fixtures:load
```

## 📝 Créer une Entité API

### 1. Générer l'entité

```bash
php bin/console make:entity Article
```

### 2. Configurer l'entité pour API Platform

```php
<?php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title = '';

    // ... getters et setters
}
```

### 3. Créer la migration et migrer

```bash
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate
```

Les endpoints suivants seront créés automatiquement :
- `GET /api/articles` - Récupérer tous les articles
- `POST /api/articles` - Créer un article
- `GET /api/articles/{id}` - Récupérer un article
- `PUT /api/articles/{id}` - Modifier un article
- `DELETE /api/articles/{id}` - Supprimer un article

## 🧪 Tests

### Lancer les tests

```bash
php bin/phpunit
```

### Créer un test

```bash
php bin/console make:test
```

## 🐛 Debugging

### Afficher les routes

```bash
php bin/console debug:router
```

### Afficher les services

```bash
php bin/console debug:container
```

### Vider le cache

```bash
php bin/console cache:clear
```

## 📖 Documentation Utile

- [Symfony Documentation](https://symfony.com/doc/)
- [API Platform](https://api-platform.com/)
- [Doctrine ORM](https://www.doctrine-project.org/)

## 📝 Commandes Utiles

```bash
# Contrôleurs
php bin/console make:controller MonController

# Entités
php bin/console make:entity MonEntity

# Migrations
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate

# CRUD API
php bin/console make:crud Article

# Fixtures
php bin/console doctrine:fixtures:load

# Cache
php bin/console cache:clear
php bin/console cache:warmup

# Routes
php bin/console debug:router
php bin/console debug:router nom-route

# Services
php bin/console debug:container
php bin/console debug:container mon-service
```

## 🎯 Points d'Accès

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/` | GET | Accueil API |
| `/health` | GET | Vérification de santé |
| `/api/docs` | GET | Documentation Swagger |
| `/api/openapi.json` | GET | Schéma OpenAPI |

## ✨ Prochaines Étapes

1. Installer les dépendances Composer
2. Créer les premières entités (Card, User, Template, etc.)
3. Générer les migrations
4. Créer les fixtures de test
5. Intégrer l'authentification (JWT, OAuth2)
6. Implémenter les services métier

## 🆘 Troubleshooting

### Les commandes Symfony ne fonctionnent pas

```bash
# Via Docker
cd docker
./manage.sh shell-php
php bin/console [command]
```

### Erreur de connexion à la base

```bash
php bin/console doctrine:database:create
php bin/console doctrine:database:drop --force
```

### Cache corrompu

```bash
rm -rf var/cache/*
php bin/console cache:clear
```
