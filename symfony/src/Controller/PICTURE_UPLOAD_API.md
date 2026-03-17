# 📤 API Upload d'Images - Symfony

## Overview

Cette fonctionnalité permet d'uploader une image via l'API Symfony. L'image sera:
1. Sauvegardée sur le disque dans le répertoire `/public/uploads`
2. Enregistrée dans la table `picture` avec le type **"fichier"**
3. Accessible via une URL HTTP

## Endpoint

```
POST /api/pictures/upload
Content-Type: multipart/form-data
```

## Paramètres

- **file** (requis) : Le fichier image à uploader
  - Types acceptés: JPEG, PNG, GIF, WebP, SVG
  - Taille maximale: 5MB

## Réponse au succès (201 Created)

```json
{
  "success": true,
  "message": "Fichier uploadé avec succès",
  "picture": {
    "id": 1,
    "type": "fichier",
    "value": "/uploads/mon_image_1234567890.jpg",
    "url": "http://localhost:8080/uploads/mon_image_1234567890.jpg"
  }
}
```

## Réponse en cas d'erreur

```json
{
  "error": "Description de l'erreur"
}
```

## Statuts HTTP

- `201 Created` - Upload réussi
- `400 Bad Request` - Fichier manquant, type non autorisé ou trop volumineux
- `500 Internal Server Error` - Erreur serveur

---

## 📝 Exemples d'utilisation

### 1. Upload simple avec curl

```bash
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg"
```

### 2. Upload depuis Windows (PowerShell)

```powershell
$FilePath = "C:\Users\Utilisateur\Pictures\photo.png"
$Uri = "http://localhost:8080/api/pictures/upload"
Invoke-RestMethod -Uri $Uri -Method Post -Form @{
    file = Get-Item -Path $FilePath
}
```

### 3. Upload avec la réponse JSON formatée

```bash
curl -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg" \
  -H "Accept: application/json" | jq '.'
```

### 4. Upload et capture l'ID de l'image

```bash
RESPONSE=$(curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg")

PICTURE_ID=$(echo $RESPONSE | grep -o '"id":[0-9]*' | cut -d: -f2)
echo "Image ID: $PICTURE_ID"
```

### 5. Upload et utiliser l'image dans une Card

```bash
# Étape 1 : Uploader l'image
RESPONSE=$(curl -s -X POST http://localhost:8080/api/pictures/upload \
  -F "file=@/path/to/image.jpg")

# Extraire l'ID de l'image
PICTURE_ID=$(echo $RESPONSE | jq '.picture.id')

# Étape 2 : Créer une card avec l'image
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

### 6. Upload via JavaScript/Fetch

```javascript
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:8080/api/pictures/upload', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  
  if (response.ok) {
    console.log('Upload réussi!');
    console.log('ID:', data.picture.id);
    console.log('URL:', data.picture.url);
    return data.picture;
  } else {
    console.error('Erreur:', data.error);
  }
}

// Utilisation
document.getElementById('fileInput').addEventListener('change', (e) => {
  uploadImage(e.target.files[0]);
});
```

### 7. Upload avec validation en Ruby

```ruby
require 'net/http'

def upload_image(file_path)
  uri = URI('http://localhost:8080/api/pictures/upload')
  
  Net::HTTP.start(uri.host, uri.port) do |http|
    req = Net::HTTP::Post.new(uri)
    
    form_data = [[:file, File.open(file_path)]]
    req.set_form(form_data, 'multipart/form-data')
    
    response = http.request(req)
    
    if response.code == '201'
      puts "✅ Upload réussi!"
      JSON.parse(response.body)
    else
      puts "❌ Erreur: #{response.body}"
    end
  end
end

# Utilisation
result = upload_image('/path/to/image.jpg')
puts "Picture ID: #{result['picture']['id']}"
```

### 8. Upload avec validation de taille en Python

```python
import requests
from pathlib import Path

def upload_image(file_path):
    # Vérifier la taille du fichier (max 5MB)
    file_size = Path(file_path).stat().st_size
    if file_size > 5 * 1024 * 1024:
        print("❌ Fichier trop volumineux (max 5MB)")
        return None
    
    # Upload
    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(
            'http://localhost:8080/api/pictures/upload',
            files=files
        )
    
    if response.status_code == 201:
        print("✅ Upload réussi!")
        data = response.json()
        return data['picture']
    else:
        print(f"❌ Erreur: {response.json()['error']}")
        return None

# Utilisation
picture = upload_image('/path/to/image.jpg')
if picture:
    print(f"Picture ID: {picture['id']}")
    print(f"URL: {picture['url']}")
```

### 9. Upload multiple (boucle bash)

```bash
#!/bin/bash

UPLOAD_DIR="/path/to/images"

for image in $UPLOAD_DIR/*.jpg; do
  echo "Uploading: $image"
  curl -s -X POST http://localhost:8080/api/pictures/upload \
    -F "file=@$image" | jq '.picture.id'
done
```

### 10. Upload with error handling (advanced curl)

```bash
upload_image() {
  local file=$1
  
  if [ ! -f "$file" ]; then
    echo "❌ Fichier non trouvé: $file"
    return 1
  fi
  
  local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
  if [ $size -gt $((5 * 1024 * 1024)) ]; then
    echo "❌ Fichier trop volumineux"
    return 1
  fi
  
  local response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/pictures/upload \
    -F "file=@$file")
  
  local body=$(echo "$response" | head -n -1)
  local status=$(echo "$response" | tail -n 1)
  
  if [ "$status" = "201" ]; then
    echo "✅ Upload réussi!"
    echo "$body" | jq '.picture'
  else
    echo "❌ Erreur HTTP $status"
    echo "$body" | jq '.error'
  fi
}

# Utilisation
upload_image "/path/to/image.jpg"
```

---

## 🔧 Configuration (Docker)

Si vous utilisez Docker, assurez-vous que le répertoire `public/uploads` existe:

```bash
# Dans le conteneur Symfony
docker-compose exec symfony mkdir -p public/uploads
docker-compose exec symfony chmod 755 public/uploads

# Ou directement
mkdir -p ./symfony/public/uploads
chmod 755 ./symfony/public/uploads
```

## 🚀 Mise à jour en production

Avant de déployer, n'oubliez pas de:

1. Exécuter les migrations:
   ```bash
   symfony console doctrine:migrations:migrate
   ```

2. Créer le répertoire d'uploads avec les bonnes permissions:
   ```bash
   mkdir -p $(pwd)/public/uploads
   chown www-data:www-data $(pwd)/public/uploads
   chmod 755 $(pwd)/public/uploads
   ```

3. Configurer une URL de base appropriée dans `services.yaml`:
   ```yaml
   parameters:
     app.upload_base_url: 'https://votredomaine.fr'
   ```

## ⚠️ Limitations actuelles

- Taille maximale: 5MB par fichier
- Types acceptés: JPEG, PNG, GIF, WebP, SVG
- Les fichiers uploadés sont accessibles publiquement via `/uploads/`
- Aucun système de quotas utilisateur
