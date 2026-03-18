# 🎴 Greeting Card AI - Backend Symfony

Backend API pour l'application Greeting Card AI, construit avec Symfony 7.4 et API Platform.

## 🚀 Démarrage rapide

### Prérequis
- Docker & Docker Compose
- PHP 8.2+ (optionnel, inclus dans Docker)

### Installation

```bash
# Démarrer les conteneurs
docker compose up -d

# Appliquer les migrations
docker compose exec php php bin/console doctrine:migrations:migrate

# Vérifier l'API
curl http://localhost:8080/api
```

L'API est accessible à `http://localhost:8080/api`

## 📦 Nouvelles fonctionnalités

### 📤 Upload d'images (v1.1) ✨

Nouvelle fonctionnalité permettant d'uploader des images directement via l'API.

#### Installation rapide
```bash
# Rendre le script exécutable
chmod +x deploy_upload_feature.sh

# Exécuter l'installation
./deploy_upload_feature.sh
```

#### Utilisation
```bash
# Upload d'une image
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg"
```

**Réponse:**
```json
{
  "success": true,
  "message": "Fichier uploadé avec succès",
  "picture": {
    "id": 1,
    "type": "fichier",
    "value": "/uploads/image.jpg",
    "url": "http://localhost:8080/uploads/image.jpg"
  }
}
```

📚 **Documentation complète:**
- `CURL_EXAMPLES.md` - Exemples curl rapides
- `PICTURE_UPLOAD_API.md` - Doc. API détaillée  
- `INSTALLATION_UPLOAD.md` - Guide d'installation
- `UPLOAD_FEATURE_SUMMARY.md` - Résumé complet

## 📋 Architecture

```
symfony/
├── bin/
│   └── console              # Ligne de commande Symfony
├── src/
│   ├── Controller/          # Contrôleurs (upload, etc)
│   ├── Entity/              # Entités Doctrine
│   ├── Repository/          # Repositories
│   ├── State/               # State Providers/Processors (API Platform)
│   └── Kernel.php           # Noyau Symfony
├── migrations/              # Migrations Doctrine
├── public/
│   ├── uploads/            # Fichiers uploadés
│   └── index.php           # Point d'entrée
├── config/                  # Configuration
└── tests/                   # Tests
```

## 🗄️ Base de données

### Entités principales

#### Card
```
- id: int
- title: string
- description: text
- picture: Picture (OneToOne)
- tags: Tag[] (ManyToMany)
- isActif: boolean
```

#### Picture
```
- id: int
- type: string (url, base64, fichier)
- value: text (URL, données base64, ou chemin fichier)
```

#### Tag
```
- id: int
- name: string
```

### Endpoints API

| Méthode | Route | Description |
|---------|-------|---|
| `GET` | `/api/cards` | Toutes les cards |
| `GET` | `/api/cards/{id}` | Une card spécifique |
| `GET` | `/api/cards_active` | Cards actives seulement |
| `POST` | `/api/cards` | Créer une card |
| `PUT` | `/api/cards/{id}` | Modifier une card |
| `DELETE` | `/api/cards/{id}` | Supprimer une card |
| `GET` | `/api/tags` | Tous les tags |
| `POST` | `/api/pictures/upload` | ✨ Upload une image |
| `GET` | `/api/pictures` | Toutes les images |

## 🔧 Commandes utiles

```bash
# Démarrer le serveur
docker compose up php

# Migrations
docker compose exec php php bin/console doctrine:migrations:migrate
docker compose exec php php bin/console make:migration

# Tests
docker compose exec php php bin/console test

# CLI Symfony
docker compose exec php php bin/console

# Accès à la base de données
docker compose exec mysql mysql -u root -proot greeting_card
```

## 📤 Upload d'images

### Format de requête
```
POST /api/pictures/upload
Content-Type: multipart/form-data

file: [image file]
```

### Types acceptés
- JPEG
- PNG
- GIF
- WebP
- SVG

### Limites
- **Taille max**: 5MB

### Exemple
```bash
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@./photo.jpg"
```

## 🔒 Sécurité

- ✅ Validation MIME type
- ✅ Limite de taille  
- ✅ Noms de fichiers sécurisés
- ⏳ Authentification (à faire)
- ⏳ Quotas utilisateur (à faire)

## 🧪 Tests

### Tester l'upload
```bash
chmod +x test_upload.sh
./test_upload.sh /path/to/image.jpg
```

### Exemples curl
Voir `CURL_EXAMPLES.md` pour 35+ exemples

## 📊 Monitoring

### Logs
```bash
docker compose logs -f php
docker compose logs -f mysql
```

### Vérifier la santé
```bash
# API disponible?
curl http://localhost:8080/api

# Base de données?
docker compose exec mysql mysql -u root -proot greeting_card -e "SELECT VERSION();"

# Fichiers uploadés?
ls -la ./public/uploads/
```

## 🚀 Déploiement

### Production

1. Augmenter la limite de fichiers:
```yaml
# config/services.yaml
parameters:
  app.upload_base_url: 'https://votredomaine.fr'
```

2. Nettoyer les uploads régulièrement:
```bash
find ./public/uploads -type f -mtime +30 -delete
```

3. Configurer CDN pour les fichiers statiques

## 📝 Variables d'environnement

```bash
# .env
DATABASE_URL=mysql://root:root@mysql:3306/greeting_card
APP_ENV=prod
```

## 🆘 Troubleshooting

### Port 8080 déjà utilisé
```bash
# Trouver le processus
lsof -i :8080

# Changer le port dans docker-compose.yml
ports:
  - "8081:80"  # Nouveau port: 8081
```

### Erreurs de migration
```bash
docker compose exec php php bin/console doctrine:migrations:list
docker compose exec php php bin/console doctrine:migrations:status
```

### Problèmes de permission (uploads)
```bash
docker compose exec php chown -R www-data:www-data public/uploads
docker compose exec php chmod -R 755 public/uploads
```

## 🤝 Contribution

Les contributions sont bienvenues! Consultez le fichier `.copilot-instructions.md` pour les règles du projet.

## 📚 Documentation supplémentaire

- [API Platform](https://api-platform.com)
- [Symfony 7.4](https://symfony.com/doc/7.4)
- [Doctrine ORM](https://www.doctrine-project.org)

## 📞 Support

Pour les problèmes spécifiques à l'upload:
👉 Consultez `PICTURE_UPLOAD_API.md`

Pour les exemples curl:
👉 Consultez `CURL_EXAMPLES.md`

---

**Version:** 1.1.0  
**Dernière mise à jour:** 17 mars 2026  
**Statut:** ✅ Production ready
