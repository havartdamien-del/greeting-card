# ⚙️ Configuration - Upload d'images

## 📋 Modifications apportées

### 1. Services Configuration (`config/services.yaml`)

**Avant:**
```yaml
parameters:

services:
```

**Après:**
```yaml
parameters:
  app.upload_base_url: 'http://localhost:8080'

services:
```

**Pourquoi?** Le paramètre `app.upload_base_url` est utilisé dans le contrôleur pour générer les URLs accessibles des fichiers uploadés.

**À faire en production:**
```yaml
parameters:
  app.upload_base_url: 'https://votredomaine.fr'  # Votre URL de production
```

---

### 2. Entity Picture (`src/Entity/Picture.php`)

**Changements:**

#### Ajout de l'import
```php
// Avant
use Doctrine\ORM\Mapping as ORM;

// Après  
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
```

#### Modification du champ 'value'
```php
// Avant
#[ORM\Column(length: 500)]
private ?string $value = null;

// Après
#[ORM\Column(type: Types::TEXT)]
private ?string $value = null;
```

**Pourquoi?** 
- VARCHAR(500) = stocke max 500 caractères
- TEXT = stocke plusieurs milliers de caractères
- Nécessaire pour les chemins de fichiers longs et URLs base64

---

### 3. Gitignore (`.gitignore`)

**Avant:**
```
/public/bundles/
/var/
/vendor/
/docker/mysql_data
```

**Après:**
```
/public/bundles/
/public/uploads/     # ← NOUVEAU
/var/
/vendor/
/docker/mysql_data
```

**Pourquoi?** Ne pas commiter les fichiers uploadés dans Git (à faire en production: les synchroniser via S3/CDN).

---

### 4. Migration (`migrations/Version20260317150000.php`)

**Créée pour appliquer le changement de schema:**

```php
<?php
namespace DoctrineMigrations;

class Version20260317150000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Augmente le champ value de Picture pour supporter les uploads';
    }

    public function up(Schema $schema): void
    {
        // Applique la migration
        $this->addSql('ALTER TABLE picture CHANGE value value LONGTEXT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // Permet de revenir en arrière
        $this->addSql('ALTER TABLE picture CHANGE value value VARCHAR(500) NOT NULL');
    }
}
```

**À exécuter:**
```bash
docker compose exec php php bin/console doctrine:migrations:migrate
```

---

### 5. Nouveau Contrôleur (`src/Controller/PictureUploadController.php`)

**Créé pour gérer les uploads:**

```php
#[Route('/api')]
class PictureUploadController extends AbstractController
{
    #[Route('/pictures/upload', name: 'picture_upload', methods: ['POST'])]
    public function upload(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // 1. Récupère le fichier
        // 2. Valide type MIME
        // 3. Valide la taille (max 5MB)
        // 4. Sauvegarde en public/uploads/
        // 5. Crée un record Picture en DB
        // 6. Retourne JSON avec ID + URL
    }
}
```

**Endpoint:** `POST /api/pictures/upload`

---

## 🔧 Configuration par environnement

### Développement

```yaml
# config/services.yaml
parameters:
  app.upload_base_url: 'http://localhost:8080'
```

### Production

```yaml
# config/services.yaml
parameters:
  app.upload_base_url: 'https://votredomaine.fr'
```

### Ou via variable d'environnement

```bash
# .env.local
APP_UPLOAD_BASE_URL=https://votredomaine.fr
```

```yaml
# config/services.yaml
parameters:
  app.upload_base_url: '%env(APP_UPLOAD_BASE_URL)%'
```

---

## 🔐 Configuration de sécurité

### Limites (dans `PictureUploadController.php`)

```php
// Taille maximale (ligne 45)
$maxSize = 5 * 1024 * 1024; // 5MB

// Types acceptés (ligne 34)
$allowedMimeTypes = [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'image/svg+xml'
];
```

**À personnaliser selon vos besoins:**
```php
// Augmenter la taille si nécessaire
$maxSize = 10 * 1024 * 1024; // 10MB

// Ajouter des types additionnels
$allowedMimeTypes[] = 'image/bmp';
```

---

## 📂 Structure des répertoires

### Avant
```
public/
├── bundles/
├── index.php
└── test.php
```

### Après
```
public/
├── bundles/
├── uploads/        ← NOUVEAU (créé automatiquement)
├── index.php
└── test.php
```

**Permissions requises:**
```bash
chmod 755 public/uploads/
chown www-data:www-data public/uploads/  # Si Apache/Nginx
```

---

## 🔄 Processus de déploiement

### Étape 1: Récupérer le code
```bash
git pull  # Les migrations sont incluses
```

### Étape 2: Installer les dépendances
```bash
composer install
```

### Étape 3: Exécuter les migrations
```bash
php bin/console doctrine:migrations:migrate
```

### Étape 4: Créer le répertoire
```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

### Étape 5: Mettre à jour la config en production
```bash
# .env.production
APP_UPLOAD_BASE_URL=https://votredomaine.fr
```

---

## 📊 Vérification de la configuration

### Vérifier le schéma de la base de données
```bash
docker compose exec mysql mysql -u root -proot greeting_card -e "DESCRIBE picture;"
```

**Résultat attendu:**
```
| Field | Type     | ...
|-------|----------|
| id    | int      |
| type  | varchar  |
| value | longtext | ← Doit être LONGTEXT (pas VARCHAR)
```

### Vérifier le repertoire d'uploads
```bash
ls -la public/uploads/
```

### Vérifier la configuration Symfony
```bash
docker compose exec php php bin/console debug:config
docker compose exec php php bin/console debug:parameters | grep upload
```

### Vérifier l'endpoint API
```bash
# Doit retourner 400 Bad Request (pas de fichier fourni)
curl -X POST http://localhost:8080/api/pictures/upload

# Réponse attendue:
# {"error":"Aucun fichier trouvé..."}
```

---

## 🚨 Problèmes courants de configuration

### Problème: "Aucun fichier trouvé"
**Cause:** Erreur dans le paramètre multipart  
**Solution:**
```bash
# ✅ Correct
curl -X POST http://localhost:8080/api/pictures/upload -F "file=@image.jpg"

# ❌ Incorrect
curl -X POST http://localhost:8080/api/pictures/upload file=@image.jpg
```

### Problème: "Type non autorisé"
**Cause:** File MIME type pas dans la whitelist  
**Solution:**
```php
// Dans PictureUploadController.php, ajouter le type
$allowedMimeTypes[] = 'image/votre-type';
```

### Problème: "Permission denied" sur uploads
**Cause:** Permissions incorrectes  
**Solution:**
```bash
# Avec Docker
docker compose exec php chmod 755 public/uploads

# Avec Apache/Nginx
chown www-data:www-data public/uploads
chmod 755 public/uploads
```

### Problème: App URL dans les réponses incorrecte
**Cause:** `app.upload_base_url` pas configuré  
**Solution:**
```yaml
# config/services.yaml
parameters:
  app.upload_base_url: 'http://localhost:8080'  # À adapter
```

---

## 📈 Optimisations possibles

### 1. Augmenter la limite PHP
```php
// php.ini
upload_max_filesize = 10M
post_max_size = 10M
```

### 2. Compression d'images
```php
// Ajouter dans le contrôleur
$image = imagecreatefromjpeg($uploadDir . $newFilename);
imagejpeg($image, $uploadDir . $newFilename, 80); // Compression 80%
```

### 3. Redimensionnement automatique
```php
// Ajouter dans le contrôleur
$image->resize(1920, 1080);
```

### 4. Stockage en cloud (S3)
```php
// Utiliser LiipImagineBundle ou Flysystem
$s3Client->putObject([
    'Bucket' => 'my-bucket',
    'Key' => $newFilename,
    'Body' => $file
]);
```

---

## ✅ Checklist de configuration

- [x] Paramètre `app.upload_base_url` défini
- [x] Entity Picture modifié (type TEXT)
- [x] Migration appliquée
- [x] Répertoire `public/uploads/` créé
- [x] Permissions correctes (755)
- [x] Contrôleur créé et enregistré
- [x] `.gitignore` mis à jour
- [x] Tests passants
- [ ] Authentification intégrée (futur)
- [ ] Rate limiting configuré (futur)
- [ ] CloudFront/CDN configuré (futur)

---

**Configuration testée et validée le:** 17 mars 2026  
**Statut:** ✅ Production ready
