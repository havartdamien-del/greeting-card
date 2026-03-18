# 📤 Installation de la Fonctionnalité Upload d'Images

## 📋 Résumé des changements

### Fichiers créés:
- ✅ `src/Controller/PictureUploadController.php` - Contrôleur d'upload
- ✅ `migrations/Version20260317150000.php` - Migration pour augmenter le champ `value`
- ✅ `PICTURE_UPLOAD_API.md` - Documentation complète
- ✅ `test_upload.sh` - Script de test

### Fichiers modifiés:
- ✅ `src/Entity/Picture.php` - Ajout de l'import `Types` et changement du type de colonne
- ✅ `config/services.yaml` - Ajout du paramètre `app.upload_base_url`
- ✅ `.gitignore` - Exclusion du répertoire `public/uploads/`

## 🚀 Installation

### Étape 1: Appliquer les migrations

Exécutez la migration pour augmenter la colonne `value` de la table `picture`:

```bash
# Avec Docker
docker compose exec php php bin/console doctrine:migrations:migrate

# Sans Docker
php bin/console doctrine:migrations:migrate
```

### Étape 2: Créer le répertoire d'uploads

```bash
# Avec Docker
docker compose exec php mkdir -p public/uploads
docker compose exec php chmod 755 public/uploads

# Sans Docker
mkdir -p public/uploads
chmod 755 public/uploads
```

### Étape 3: Vérifier que Symfony sert les fichiers statiques

Assurez-vous que Nginx ou Apache sert le répertoire `public/`:

#### Pour Docker/Nginx:
Les fichiers dans `public/` sont automatiquement servis via `/` grâce à la configuration Nginx.

#### Pour Apache:
```apache
DocumentRoot /path/to/project/public
<Directory /path/to/project/public>
    AllowOverride None
    Order allow,deny
    Allow from all
</Directory>
```

## ✅ Vérification

### Test 1: Vérifier la migration
```bash
# Avec Docker
docker compose exec php php bin/console doctrine:migrations:list

# Vérifier dans la base de données
docker compose exec mysql mysql -u root -p'password' greeting_card -e "DESCRIBE picture;"
```

Vous devriez voir que la colonne `value` est maintenant de type `LONGTEXT`.

### Test 2: Tester l'upload

```bash
# Rendre le script exécutable
chmod +x test_upload.sh

# Lancer le test
./test_upload.sh

# Ou avec une image personnalisée
./test_upload.sh /path/to/your/image.jpg
```

## 📝 Exemples d'utilisation rapides

### Uploading via curl

```bash
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg"
```

### Résultat:
```json
{
  "success": true,
  "message": "Fichier uploadé avec succès",
  "picture": {
    "id": 1,
    "type": "fichier",
    "value": "/uploads/image_1234567890.jpg",
    "url": "http://localhost:8080/uploads/image_1234567890.jpg"
  }
}
```

### Créer une Card avec l'image uploadée

```bash
# Récupérer l'ID de l'image uploadée
PICTURE_ID=1

# Créer une Card
curl -X POST http://localhost:8080/api/cards \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Ma belle carte\",
    \"description\": \"Avec mon image uploadée\",
    \"picture\": \"/api/pictures/$PICTURE_ID\",
    \"tags\": [],
    \"isActif\": true
  }"
```

## 🔧 Configuration

### URL de base pour les uploads

Par défaut, l'URL de base est `http://localhost:8080`. Modifiez-la dans `config/services.yaml`:

```yaml
parameters:
  app.upload_base_url: 'https://votredomaine.fr'  # ← Votre URL
```

### Limites d'upload

Dans `src/Controller/PictureUploadController.php`, vous pouvez modifier:

- **Taille maximale** (ligne 45): `$maxSize = 5 * 1024 * 1024; // 5MB`
- **Types acceptés** (ligne 34): `$allowedMimeTypes = [...]`

## 📂 Structure des fichiers

```
symfony/
├── src/
│   ├── Controller/
│   │   └── PictureUploadController.php      (NOUVEAU)
│   ├── Entity/
│   │   └── Picture.php                      (MODIFIÉ - Types import)
│   └── ...
├── migrations/
│   └── Version20260317150000.php           (NOUVEAU)
├── public/
│   └── uploads/                             (À créer)
├── config/
│   └── services.yaml                        (MODIFIÉ - app.upload_base_url)
├── .gitignore                               (MODIFIÉ - public/uploads/)
├── PICTURE_UPLOAD_API.md                   (NOUVEAU)
└── test_upload.sh                           (NOUVEAU)
```

## 🐛 Troubleshooting

### Erreur "Fichier non trouvé"
```
❌ Erreur: Aucun fichier trouvé
```
Assurez-vous d'envoyer le formulaire avec `Content-Type: multipart/form-data` et la clé `file`.

### Erreur "Type de fichier non autorisé"
```
❌ Erreur: Type de fichier non autorisé
```
Mettez un fichier image valide (JPEG, PNG, GIF, WebP, SVG).

### Erreur "Fichier trop volumineux"
```
❌ Erreur: Fichier trop volumineux
```
Compressez votre image ou augmentez la limite dans le contrôleur.

### Le fichier n'est pas accessible via HTTP
```
⚠️ Le fichier n'est pas encore accessible
```
Vérifiez que:
1. Le répertoire `public/uploads/` existe et a les bonnes permissions
2. Nginx/Apache sert bien le répertoire `public/`
3. Vérifiez les logs d'erreur

### Erreur de permission lors de la création du répertoire
```
Permission denied
```
Assurez-vous que l'utilisateur qui exécute Symfony a les droits d'écriture dans `public/`.

## 🔒 Sécurité

La fonctionnalité implémente plusieurs mesures de sécurité:

- ✅ Validation de type MIME (JPEG, PNG, GIF, WebP, SVG uniquement)
- ✅ Limite de taille (5MB par défaut)
- ✅ Gestion d'erreurs robuste
- ✅ Noms de fichiers sécurisés (génération d'identifiant unique)
- ⚠️ **À faire:** Ajouter l'authentification et les contrôles d'accès

## 📚 Documentation complète

Pour la documentation complète avec davantage d'exemples, consultez:
👉 `src/Controller/PICTURE_UPLOAD_API.md`

## 🎯 Prochaines étapes

1. Ajouter l'authentification (vérifier l'utilisateur avant upload)
2. Implémenter les quotas par utilisateur
3. Ajouter la suppression d'images
4. Implémenter la compression automatique des images
5. Ajouter les filtres d'images (redimensionnement, etc.)
