# 📤 Exemples CURL rapides - Upload d'Images

## ⚡ Les plus simples

### 1️⃣ Upload basique
```bash
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg"
```

### 2️⃣ Upload avec réponse formatée (JSON)
```bash
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg" | jq '.picture'
```

### 3️⃣ Upload et récupérer seulement l'ID
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg" | jq '.picture.id'
```

### 4️⃣ Upload et récupérer l'URL accessible
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg" | jq '.picture.url'
```

---

## 🔄 Workflows complets

### Workflow 1: Upload + Créer Card
```bash
#!/bin/bash

# Step 1: Upload image
PICTURE=$(curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@./my-image.jpg")

PICTURE_ID=$(echo $PICTURE | jq '.picture.id')
echo "✅ Image uploadée avec l'ID: $PICTURE_ID"

# Step 2: Create card with image
curl -s -X POST http://localhost:8080/api/cards \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Nouvelle carte\",
    \"description\": \"Avec mon image\",
    \"picture\": \"/api/pictures/$PICTURE_ID\",
    \"tags\": [],
    \"isActif\": true
  }" | jq '.id'

echo "✅ Card créée avec succès!"
```

### Workflow 2: Upload multiple (Loop)
```bash
#!/bin/bash

for image in ./images/*.jpg; do
  echo "📤 Uploading: $image"
  curl -s -X POST http://localhost:8080/api/pictures/upload \
    -F "file=@$image" | jq '.picture | {id, value}'
done
```

### Workflow 3: Upload avec conditions
```bash
#!/bin/bash

FILE="$1"

# Check file exists
if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

# Check file size (max 5MB)
SIZE=$(stat -f%z "$FILE" 2>/dev/null || stat -c%s "$FILE")
if [ $SIZE -gt 5242880 ]; then
  echo "❌ File too big (max 5MB, got $(($SIZE / 1024 / 1024))MB)"
  exit 1
fi

# Upload
echo "📤 Uploading $FILE..."
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@$FILE" | jq '.'
```

---

## 🧪 Tests de validation

### Test 1️⃣ : Fichier manquant
```bash
curl -X POST http://localhost:8080/api/pictures/upload -F "file="
```
**Résultat attendu:** `400 Bad Request` - "Aucun fichier trouvé"

### Test 2️⃣ : Type de fichier invalide
```bash
# Créer un fichier .txt
echo "Ceci n'est pas une image" > test.txt
curl -X POST http://localhost:8080/api/pictures/upload -F "file=@test.txt"
```
**Résultat attendu:** `400 Bad Request` - "Type de fichier non autorisé"

### Test 3️⃣ : Fichier trop volumineux
```bash
# Créer un fichier de 10MB
dd if=/dev/zero of=big.jpg bs=1M count=10
curl -X POST http://localhost:8080/api/pictures/upload -F "file=@big.jpg"
```
**Résultat attendu:** `400 Bad Request` - "Fichier trop volumineux"

---

## 📊 Extraire les données

### Extraire tous les champs
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq '.picture'
```

### Extraire seulement l'ID
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq -r '.picture.id'
```

### Extraire seulement le chemin (value)
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq -r '.picture.value'
```

### Extraire seulement l'URL
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq -r '.picture.url'
```

### Extraire le type
```bash
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq -r '.picture.type'
```

---

## 🖥️ Avec variables d'environnement

```bash
API_URL="http://localhost:8080"
IMAGE_PATH="./my-image.jpg"

curl -X POST "$API_URL/api/pictures/upload" \
  -F "file=@$IMAGE_PATH"
```

Utilisation:
```bash
export API_URL="http://localhost:8080"
export IMAGE_PATH="./images/photo.jpg"
curl -X POST "$API_URL/api/pictures/upload" -F "file=@$IMAGE_PATH"
```

---

## 🔗 Intégration avec des tools

### Avec Postman
```
POST http://localhost:8080/api/pictures/upload
Headers:
  - Content-Type: multipart/form-data

Body:
  - file: [SELECT YOUR FILE]
```

### Avec Insomnia
```
POST http://localhost:8080/api/pictures/upload
Form:
  - file: [Click "Select file"]
```

### Avec HTTPie (CLI)
```bash
http -f POST http://localhost:8080/api/pictures/upload file@./image.jpg
```

### Avec Wget
```bash
wget --post-file=image.jpg \
  http://localhost:8080/api/pictures/upload
```

---

## 📝 Codes d'erreur

| Code | Signification |
|------|---|
| `201` | ✅ Upload réussi |
| `400` | ❌ Fichier manquant/invalide/trop gros |
| `500` | ❌ Erreur serveur |

---

## 💾 Sauvegarder la réponse dans un fichier

```bash
# Sauvegarder la réponse JSON
curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" > response.json

# Sauvegarder l'ID dans un variable
PICTURE_ID=$(curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@image.jpg" | jq -r '.picture.id')

echo "Picture ID: $PICTURE_ID" > picture_id.txt
```

---

## 🔐 Avec authentification (futur)

Quand l'authentification sera implémentée:

```bash
TOKEN="votre_token_jwt"

curl -X POST http://localhost:8080/api/pictures/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@image.jpg"
```

---

## 🚀 En production

```bash
API_URL="https://votredomaine.fr"

curl -X POST "$API_URL/api/pictures/upload" \
  -F "file=@image.jpg"
```

---

## 📞 Besoin d'aide?

Consultez la documentation complète:
👉 `PICTURE_UPLOAD_API.md`
