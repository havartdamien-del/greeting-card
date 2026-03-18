# ⚡ Quick Start - Upload d'Images

## 3️⃣ Étapes d'installation

```bash
# 1️⃣ Migration
docker compose exec php php bin/console doctrine:migrations:migrate

# 2️⃣ Répertoire
docker compose exec php mkdir -p public/uploads

# 3️⃣ Test
chmod +x test_upload.sh && ./test_upload.sh
```

## 📤 Utilisation immédiate

```bash
# Upload une image
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg"
```

## 📋 Réponse

```json
{
  "success": true,
  "picture": {
    "id": 1,
    "type": "fichier",
    "value": "/uploads/image_123456.jpg",
    "url": "http://localhost:8080/uploads/image_123456.jpg"
  }
}
```

## 🔗 Créer une Card avec l'image

```bash
PICTURE_ID=1

curl -X POST http://localhost:8080/api/cards \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Ma carte\",
    \"picture\": \"/api/pictures/$PICTURE_ID\",
    \"tags\": [],
    \"isActif\": true
  }"
```

## 📁 Fichiers créés

- `src/Controller/PictureUploadController.php` - Contrôleur
- `migrations/Version20260317150000.php` - Migration DB
- `test_upload.sh` - Script de test
- 6 fichiers de documentation

## 📚 Documentation

- `CURL_EXAMPLES.md` - 35+ exemples
- `PICTURE_UPLOAD_API.md` - API complète
- `INSTALLATION_UPLOAD.md` - Installation détaillée
- `CONFIG_UPLOAD.md` - Configuration

## ⚙️ Fichiers modifiés

- `src/Entity/Picture.php` - Changement du type colonne
- `config/services.yaml` - Ajout du paramètre URL
- `.gitignore` - Exclusion uploads/
- `README.md` - Documentation

## ✅ Vérification

```bash
# Vérifier la migration
docker compose exec mysql mysql -u root -proot greeting_card -e "DESCRIBE picture;" | grep value

# Vérifier l'accès API
curl http://localhost:8080/api/pictures

# Vérifier le répertoire
ls -la public/uploads/
```

## 🎯 Cas d'usage rapides

```bash
# Upload + afficher l'URL
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq '.picture.url'

# Upload + afficher l'ID
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq '.picture.id'

# Upload multiple
for img in *.jpg; do
  curl -s -X POST http://localhost:8080/api/pictures/upload \
    -F "file=@$img"
done
```

## ⚠️ Limites

- Max 5MB par fichier
- Types: JPEG, PNG, GIF, WebP, SVG
- Accessible publiquement via `/uploads/`

## 🆘 Erreurs courantes

```
❌ "Aucun fichier trouvé"
   → Vérifier la clé "file" en multipart

❌ "Type non autorisé"
   → Utiliser JPEG, PNG, GIF, WebP ou SVG

❌ "Fichier trop volumineux"
   → Compresser l'image (max 5MB)

❌ "Permission denied"
   → chmod 755 public/uploads/
```

## 📞 Besoin de plus?

- Exemples complets → Voir `CURL_EXAMPLES.md`
- Installation détaillée → Voir `INSTALLATION_UPLOAD.md`
- Configuration → Voir `CONFIG_UPLOAD.md`
- Architecture → Voir `UPLOAD_FEATURE_SUMMARY.md`

---

**Installation:** ~5 minutes  
**Status:** ✅ Prêt à utiliser
