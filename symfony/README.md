# 🚀 Symfony Backend - Greeting Card AI

## 📂 Structure du Projet

Ce répertoire contient le code source du backend Symfony avec API Platform.

```
symfony/
├── src/                # Code source PHP
├── config/             # Configuration Symfony
├── public/             # Fichiers publics (images, fichiers uploadés)
├── tests/              # Tests unitaires et fonctionnels
├── var/                # Cache, logs, uploads (généré)
├── migrations/         # Migrations Doctrine
├── composer.json       # Dépendances PHP
└── .env               # Variables d'environnement
```

## 🛠️ Installation

### Via Docker

```bash
cd docker
./manage.sh up-dev
```

### Localement

```bash
# Installer les dépendances
composer install

# Créer la base de données
php bin/console doctrine:database:create

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Charger les fixtures
php bin/console doctrine:fixtures:load
```

## 📝 Commandes Courantes

### Via Docker

```bash
# Accéder au shell PHP
cd docker
./manage.sh shell-php

# Ou exécuter directement
./manage.sh db-migrate
./manage.sh db-fixtures
```

### Localement

```bash
# Cache
php bin/console cache:clear

# Entités
php bin/console make:entity
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate

# Tests
php bin/phpunit

# API Platform - Afficher les routes
php bin/console debug:router

# Serveur de développement
php -S 127.0.0.1:8000 -t public
```

## 🗄️ Base de Données

### Structure

La base de données est gérée par **Doctrine ORM** avec **API Platform**.

### Migrations

```bash
# Créer une migration après modification des entités
php bin/console doctrine:migrations:diff

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Revenir à une migration précédente
php bin/console doctrine:migrations:migrate prev
```

### Fixtures (Données de Test)

```bash
# Charger les fixtures
php bin/console doctrine:fixtures:load

# Sans confirmation
php bin/console doctrine:fixtures:load --no-interaction
```

## 🌐 API Platform

L'API REST est générée automatiquement par API Platform.

### Documentation

- **Swagger UI** : http://localhost:9000/api/docs
- **OpenAPI JSON** : http://localhost:9000/api/openapi.json

### Créer une Ressource API

```bash
# Créer une entité
php bin/console make:entity Article

# API Platform va automatiquement créer les endpoints CRUD
# GET /api/articles
# POST /api/articles
# GET /api/articles/{id}
# PUT /api/articles/{id}
# DELETE /api/articles/{id}
```

## 🔧 Configuration

### Fichiers Importants

- `.env` : Variables d'environnement
- `config/services.yaml` : Configuration des services
- `config/routes.yaml` : Définition des routes
- `config/packages/api_platform.yaml` : Configuration API Platform
- `config/packages/doctrine.yaml` : Configuration Doctrine ORM

### Variables d'Environnement

```env
APP_ENV=dev                          # dev ou prod
APP_DEBUG=1                          # 1 ou 0
APP_SECRET=secret-key-here          # Clé secrète
DATABASE_URL=mysql://user:password@localhost:3306/db_name
```

## 📚 Structure des Entités

Exemple d'une entité simple :

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

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $content = null;

    // Getters et Setters...
}
```

## 🧪 Tests

### Créer un Test

```bash
php bin/console make:test
```

### Exécuter les Tests

```bash
# Tous les tests
php bin/phpunit

# Un fichier spécifique
php bin/phpunit tests/Controller/ArticleControllerTest.php

# Avec coverage
php bin/phpunit --coverage-html=coverage
```

## 🔐 Sécurité

### CORS

Configuré dans `config/packages/nelmio_cors.yaml` pour fonctionner avec le frontend Angular.

### Authentification

À implémenter selon vos besoins (JWT, OAuth2, etc.)

### Validation

Les validations d'entités sont définies avec les attributs PHP 8 :

```php
use Symfony\Component\Validator\Constraints as Assert;

#[Assert\NotBlank]
#[Assert\Length(min: 3, max: 255)]
private string $title = '';
```

## 📦 Dépendances Principales

- **Symfony 6.x** : Framework web
- **Doctrine ORM** : ORM PHP
- **API Platform** : Framework pour créer des APIs REST/GraphQL
- **MySQL** : Base de données

## 🚀 Déploiement

### Mode Production

```bash
# Dans .env
APP_ENV=prod
APP_DEBUG=0

# Installer les dépendances
composer install --no-dev --optimize-autoloader

# Compiler les routes
php bin/console cache:warmup
```

### Docker Production

```bash
cd docker
./manage.sh up
```

## 🐛 Debugging

### Utiliser Xdebug

Xdebug est configuré dans `docker/php/php.ini` pour fonctionner avec VS Code ou PhpStorm.

### Voir les Logs

```bash
cd docker
./manage.sh logs-php

# Ou directement
tail -f var/log/dev.log
```

### Dump les Variables

```php
dump($variable);
dd($variable); // Dump et die
```

## 📖 Documentation

- [Symfony Documentation](https://symfony.com/doc/current/index.html)
- [API Platform Documentation](https://api-platform.com/)
- [Doctrine ORM](https://www.doctrine-project.org/)

## 💡 Tips

### Hot reload avec Composer

Pour installer automatiquement les dépendances lors de modifications :

```bash
composer install --watch
```

### Vider le Cache

```bash
php bin/console cache:clear
php bin/console cache:clear --env=prod
```

### Générer une Migration pour un Changement de Schéma

```bash
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate
```

### Accéder à la Base de Données

```bash
cd docker
./manage.sh shell-mysql
mysql -u user -p greeting_card
```

## 🆘 Troubleshooting

### La migration ne fonctionne pas

```bash
# Vérifier la connexion à la BDD
php bin/console doctrine:query:sql "SELECT 1"

# Vérifier les migrations
php bin/console doctrine:migrations:list
```

### Erreur de permissions sur var/

```bash
chmod -R 777 var/
```

### La base de données n'existe pas

```bash
php bin/console doctrine:database:create
```
