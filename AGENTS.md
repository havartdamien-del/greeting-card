# 🤖 AGENTS - Greeting Card AI

Guide complet pour l'intégration des agents avec le projet Greeting Card AI. Contient les étapes de build, les tests et les conventions du projet.

---

## 📋 Vue d'ensemble du Projet

**Greeting Card AI** est une application web complète de création de cartes de vœux avec intelligence artificielle.

### Stack Technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | Angular | 21+ |
| **Backend** | Symfony + API Platform | 7.4 |
| **Base de Données** | MySQL | 8.0 |
| **Infrastructure** | Docker + Docker Compose | - |
| **PHP** | PHP FPM | 8.2 |
| **Node.js** | Node | 20 |

### Architecture

```
greeting-card-AI/
├── symfony/              # Backend: API REST + API Platform
├── angular/              # Frontend: Interface utilisateur
└── docker/               # Infrastructure: Services containerisés
```

---

## 🚀 ÉTAPES DE BUILD

### Configuration Initiale

```bash
# 1. Accéder au répertoire Docker
cd docker

# 2. Copier les variables d'environnement
cp .env.example .env

# 3. Rendre le script de gestion exécutable
chmod +x manage.sh
```

### Mode Développement

**Démarrage complet:**
```bash
cd docker
./manage.sh up-dev
```

**Services lancés:**
- ✅ Angular dev server (npm start) → http://localhost:4200
- ✅ Symfony API (PHP-FPM) → http://localhost:9000
- ✅ MySQL → localhost:3306
- ✅ Nginx (proxy) → http://localhost:80

**Points d'accès:**
- 🌐 Frontend: http://localhost:4200
- 🔌 API: http://localhost:9000
- 📊 API Docs: http://localhost:9000/api/docs

### Mode Production

**Build complet:**
```bash
cd docker
./manage.sh up
```

**Services lancés:**
- ✅ Angular buildé + Nginx → http://localhost:4200
- ✅ Symfony API optimisé → http://localhost:9000
- ✅ MySQL → localhost:3306

### Build Spécifiques

#### Backend Symfony

```bash
# Via container
cd docker
./manage.sh shell-php

# Installer les dépendances
composer install

# Lancer les migrations
php bin/console doctrine:migrations:migrate

# Charger les fixtures
php bin/console doctrine:fixtures:load
```

#### Frontend Angular

```bash
# Via container
cd docker
./manage.sh shell-ng

# Compiler pour production
npm run build

# Résultat dans: dist/
```

### Commandes Docker Essentielles

```bash
cd docker

# Gestion des services
./manage.sh up-dev       # Démarrer (développement)
./manage.sh up           # Démarrer (production)
./manage.sh down         # Arrêter

# Logs en temps réel
./manage.sh logs         # Tous les services
./manage.sh logs-php     # PHP uniquement
./manage.sh logs-ng      # Angular uniquement
./manage.sh logs-mysql   # MySQL uniquement

# Accès aux conteneurs
./manage.sh shell-php    # Shell PHP/Symfony
./manage.sh shell-ng     # Shell Angular
./manage.sh shell-mysql  # Shell MySQL

# Base de données
./manage.sh db-migrate   # Migrations Doctrine
./manage.sh db-fixtures  # Charger les fixtures

# Aide complète
./manage.sh help
```

---

## 🧪 TESTS

### Tests Frontend (Angular)

**Framework:** Jest  
**Configuration:** `angular/jest.config.js`

#### Commandes

```bash
cd docker
./manage.sh shell-ng

# Exécuter tous les tests
npm test

# Mode watch (re-exécution automatique)
npm run test:watch

# Rapport de couverture
npm run test:coverage
```

#### Structure des Tests

- **Localisation:** `angular/src/**/*.spec.ts`
- **Pattern:** `*.spec.ts`
- **Configuration:** Jest preset Angular

#### Exemples de Tests

```typescript
// angular/src/app/components/card/card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Tests Backend (Symfony)

**Framework:** PHPUnit  
**Configuration:** `symfony/phpunit.xml`

#### Commandes

```bash
cd docker
./manage.sh shell-php

# Exécuter tous les tests
php bin/phpunit

# Tests spécifiques
php bin/phpunit tests/Api/CardApiTest.php

# Avec rapport de couverture
php bin/phpunit --coverage-html coverage/
```

#### Configuration de Test

```bash
# 1. Créer la base de données de test
php bin/console doctrine:database:create --env=test

# 2. Exécuter les migrations
php bin/console doctrine:migrations:migrate --env=test

# 3. Charger les fixtures
php bin/console doctrine:fixtures:load --env=test --no-interaction

# 4. Lancer les tests
php bin/phpunit
```

#### Tests Disponibles

- **CardApiTest** : Tests des endpoints `/api/cards`
  - `testGetCardsCollection()` : Liste des cartes
  - `testCardsHaveCorrectStructure()` : Structure des données
  - `testGetActiveCardsCollection()` : Cartes actives
  - `testGetSingleCard()` : Récupération par ID
  - `testCardsCollectionPagination()` : Pagination
  - `testCardsCollectionFiltering()` : Filtrage

---

## 📐 CONVENTIONS DU PROJET

### Structure des Répertoires

#### Angular Frontend

```
angular/
├── src/
│   ├── app/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/            # Pages/features principales
│   │   ├── services/         # Services (API, état)
│   │   ├── models/           # Modèles TypeScript (interfaces)
│   │   ├── guards/           # Guards de route
│   │   └── interceptors/     # Intercepteurs HTTP
│   ├── assets/               # Images, styles globaux
│   ├── environments/         # Config par environnement
│   ├── main.ts               # Point d'entrée
│   └── styles.scss           # Styles globaux
├── angular.json              # Configuration Angular CLI
├── tsconfig.json             # Configuration TypeScript
├── jest.config.js            # Configuration Jest
├── package.json              # Dépendances npm
└── README.md
```

#### Symfony Backend

```
symfony/
├── src/
│   ├── Controller/           # Contrôleurs (uploads, etc.)
│   ├── Entity/               # Entités Doctrine
│   ├── Repository/           # Repositories
│   ├── State/                # State Providers/Processors (API Platform)
│   └── Kernel.php            # Noyau Symfony
├── config/                   # Configuration Symfony
├── public/
│   ├── uploads/              # Fichiers uploadés
│   └── index.php             # Point d'entrée
├── migrations/               # Migrations Doctrine
├── tests/                    # Tests PHPUnit
├── composer.json             # Dépendances PHP
├── phpunit.xml               # Configuration PHPUnit
└── README.md
```

#### Docker

```
docker/
├── mysql/                    # Image MySQL
│   ├── Dockerfile
│   ├── my.cnf
│   └── init.sql
├── php/                      # Image PHP-FPM + Symfony
│   ├── Dockerfile
│   ├── php.ini
│   └── php-fpm.conf
├── angular/                  # Image Angular
│   └── Dockerfile
├── nginx/                    # Configuration Nginx
│   ├── nginx.conf
│   └── default.conf
├── mysql_data/               # Données persistantes
├── docker-compose.yml        # Production
├── docker-compose.dev.yml    # Développement
├── .env.example              # Variables d'environnement
├── manage.sh                 # Script de gestion
└── README.md
```

### Conventions de Nommage

#### Angular

| Élément | Convention | Exemple |
|---------|-----------|---------|
| **Composant** | `component-name.component.ts` | `card.component.ts` |
| **Service** | `service-name.service.ts` | `card.service.ts` |
| **Module** | `feature-name.module.ts` | `card.module.ts` |
| **Test** | `*.spec.ts` | `card.component.spec.ts` |
| **Interface** | `i-interface-name.ts` | `i-card.ts` |
| **Classe CSS** | `kebab-case` | `.card-header` |

#### Symfony

| Élément | Convention | Exemple |
|---------|-----------|---------|
| **Entité** | `PascalCase` | `Card`, `Picture` |
| **Contrôleur** | `FeatureController` | `CardController` |
| **Repository** | `EntityRepository` | `CardRepository` |
| **Test** | `EntityApiTest` | `CardApiTest` |
| **Méthode** | `camelCase` | `getActiveCards()` |

### Variables d'Environnement

#### Fichier: `docker/.env`

```env
# Application
APP_ENV=dev                    # dev ou prod
APP_DEBUG=1                    # 1 ou 0
APP_SECRET=change-me          # Clé secrète (générer une nouvelle en prod)

# Base de Données
DB_DATABASE=greeting_card
DB_USER=user
DB_PASSWORD=password
DB_ROOT_PASSWORD=root

# Ports
MYSQL_PORT=3306
PHP_PORT=9000
ANGULAR_PORT=4200

# CORS
CORS_ALLOW_ORIGIN=http://localhost:4200

# API Platform
API_ENDPOINT=http://localhost:9000/api
```

### Ports Attribués

| Service | Port | URL |
|---------|------|-----|
| **Angular (dev)** | 4200 | http://localhost:4200 |
| **Angular (prod)** | 80 | http://localhost |
| **Symfony API** | 9000 | http://localhost:9000 |
| **API Docs** | 9000 | http://localhost:9000/api/docs |
| **MySQL** | 3306 | localhost:3306 |
| **Nginx** | 80 | http://localhost |

### Bonnes Pratiques

#### Workflow Angular

⚠️ **IMPORTANT:** N'exécutez PAS `npm build` après des changements en développement!

✅ **Workflow correct:**
1. Modifiez les fichiers `.ts`, `.html`, `.scss`
2. Sauvegardez (Ctrl+S)
3. Rafraîchissez le navigateur (F5)
4. C'est tout! (Angular recompile automatiquement en mode dev)

❌ **À éviter:**
- Ne pas lancer `npm build` pendant le développement
- Ne pas relancer le conteneur après chaque changement

#### Conventions de Code

**TypeScript:**
- Utiliser `strict: true` dans `tsconfig.json`
- Typer explicitement les variables et fonctions
- Préférer les interfaces aux types

**PHP:**
- Suivre PSR-12 (coding style)
- Utiliser le type hinting
- Ajouter des docblocks aux méthodes

**CSS/SCSS:**
- Utiliser BEM pour les conventions de classe
- Importer les variables globales
- Éviter les ID comme sélecteurs

### Entités Principales

#### Card (Carte de Vœux)

```
- id: int (PK)
- title: string
- description: text
- picture: Picture (OneToOne)
- tags: Tag[] (ManyToMany)
- isActif: boolean
```

#### Picture (Image)

```
- id: int (PK)
- type: string (fichier ou URL)
- value: string (chemin ou URL)
- card: Card (OneToOne)
```

#### Tag (Étiquette)

```
- id: int (PK)
- name: string
- cards: Card[] (ManyToMany)
```

### Endpoints API Principaux

```
GET    /api/cards              # Liste des cartes (paginée, filtrée)
GET    /api/cards/{id}         # Détail d'une carte
GET    /api/cards_active       # Cartes actives uniquement
POST   /api/pictures/upload    # Upload d'image
GET    /api/tags              # Liste des tags
```

### Configuration des Environnements

#### Développement (`docker-compose.dev.yml`)

- Angular: Mode serve avec hot reload
- Symfony: Mode debug activé
- Volumes montés pour live refresh
- Xdebug disponible

#### Production (`docker-compose.yml`)

- Angular: Application buildée et servie par Nginx
- Symfony: Mode normal optimisé
- Images légères et optimisées
- Données persistantes

---

## 🔄 Workflow Typique

### Démarrage du Projet

```bash
# 1. Initialisation
cd docker
cp .env.example .env
chmod +x manage.sh

# 2. Démarrage en développement
./manage.sh up-dev

# 3. Accès à l'application
# Frontend: http://localhost:4200
# API: http://localhost:9000
```

### Développement Frontend

```bash
# Accès au container Angular
cd docker
./manage.sh shell-ng

# Créer un composant
ng generate component components/mon-composant

# Tester
npm test

# Formater
npm run format

# Arrêter et relancer le watch
```

### Développement Backend

```bash
# Accès au container PHP
cd docker
./manage.sh shell-php

# Créer une entité
php bin/console make:entity

# Lancer les migrations
php bin/console doctrine:migrations:migrate

# Tester
php bin/phpunit
```

### Exécution des Tests

```bash
cd docker

# Tests Angular
./manage.sh shell-ng
npm test

# Tests Symfony
./manage.sh shell-php
php bin/phpunit
```

---

## 📚 Documentation Additionnelle

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Guide principal du projet |
| [QUICKSTART.md](QUICKSTART.md) | Démarrage rapide |
| [STRUCTURE.md](STRUCTURE.md) | Structure détaillée |
| [specifications/ARCHITECTURE.md](specifications/ARCHITECTURE.md) | Architecture complète |
| [angular/README.md](angular/README.md) | Guide Angular |
| [symfony/README.md](symfony/README.md) | Guide Symfony |
| [docker/README.md](docker/README.md) | Guide Docker |

---

## 🆘 Dépannage Courant

### Angular ne compile pas

```bash
# Vérifier le container
cd docker
./manage.sh logs-ng

# Reconstruire le container
./manage.sh down
./manage.sh up-dev
```

### Erreurs MySQL

```bash
# Vérifier la connexion
cd docker
./manage.sh logs-mysql

# Recréer les migrations
./manage.sh shell-php
php bin/console doctrine:migrations:migrate
```

### Cache à supprimer

```bash
# Symfony
./manage.sh shell-php
php bin/console cache:clear

# Angular
rm -rf angular/node_modules
npm install
```

---

**Dernière mise à jour:** 6 avril 2026  
**Version du projet:** 1.0.0
