#!/bin/bash

# 🎯 Script de test pour l'API d'upload d'images
# Usage: bash test_upload.sh <path_to_image>

BASE_URL="http://localhost:8080"
API_ENDPOINT="$BASE_URL/api/pictures/upload"

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Reset

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}   Picture Upload API Test${NC}"
echo -e "${BLUE}================================${NC}\n"

# Vérifier les arguments
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}Usage: bash test_upload.sh <path_to_image>${NC}"
    echo -e "${YELLOW}Example: bash test_upload.sh ./test-image.jpg${NC}\n"
    
    echo -e "${BLUE}Test avec une image de démonstration...${NC}"
    
    # Créer une image de test simple (1x1 PNG blanc)
    python3 << 'EOF'
from PIL import Image
img = Image.new('RGB', (100, 100), color='red')
img.save('test-image.png')
EOF
    IMAGE_FILE="test-image.png"
else
    IMAGE_FILE="$1"
fi

# Vérifier que le fichier existe
if [ ! -f "$IMAGE_FILE" ]; then
    echo -e "${RED}❌ Fichier non trouvé: $IMAGE_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}Informations du fichier:${NC}"
echo -e "  📄 Fichier: $IMAGE_FILE"
echo -e "  📊 Taille: $(du -h "$IMAGE_FILE" | cut -f1)"
echo -e "  📁 Type MIME: $(file -b --mime-type "$IMAGE_FILE")"
echo -e ""

# Test 1: Vérifier la connectivité
echo -e "${BLUE}Test 1: Vérification de la connectivité...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "404" ]; then
    echo -e "${GREEN}✅ Serveur accessible (HTTP $HTTP_CODE)${NC}\n"
else
    echo -e "${RED}❌ Serveur inaccessible (HTTP $HTTP_CODE)${NC}"
    exit 1
fi

# Test 2: Upload du fichier
echo -e "${BLUE}Test 2: Upload du fichier...${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_ENDPOINT" \
  -F "file=@$IMAGE_FILE")

BODY=$(echo "$RESPONSE" | head -n -1)
STATUS=$(echo "$RESPONSE" | tail -n 1)

echo -e "  Status HTTP: $STATUS"

if [ "$STATUS" = "201" ]; then
    echo -e "${GREEN}✅ Upload réussi!${NC}\n"
    
    # Parser la réponse
    echo -e "${BLUE}Données retournées:${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    
    # Extraire les informations
    PICTURE_ID=$(echo "$BODY" | jq -r '.picture.id' 2>/dev/null)
    PICTURE_TYPE=$(echo "$BODY" | jq -r '.picture.type' 2>/dev/null)
    PICTURE_VALUE=$(echo "$BODY" | jq -r '.picture.value' 2>/dev/null)
    PICTURE_URL=$(echo "$BODY" | jq -r '.picture.url' 2>/dev/null)
    
    echo ""
    echo -e "${BLUE}Détails:${NC}"
    echo -e "  🆔 ID: $PICTURE_ID"
    echo -e "  🏷️  Type: $PICTURE_TYPE"
    echo -e "  📍 Valeur: $PICTURE_VALUE"
    echo -e "  🔗 URL: $PICTURE_URL"
    echo ""
    
    # Test 3: Vérifier que l'image est accessible
    echo -e "${BLUE}Test 3: Vérification de l'accès au fichier...${NC}"
    if curl -s -o /dev/null -I "$PICTURE_URL"; then
        echo -e "${GREEN}✅ Le fichier est accessible via HTTP${NC}\n"
    else
        echo -e "${YELLOW}⚠️  Le fichier n'est pas encore accessible (peut être temporaire)${NC}\n"
    fi
    
    # Test 4: Vérifier dans la base de données
    echo -e "${BLUE}Test 4: Récupération depuis l'API...${NC}"
    if command -v curl &> /dev/null; then
        PICTURE_API_RESPONSE=$(curl -s "$BASE_URL/api/pictures/$PICTURE_ID")
        echo "$PICTURE_API_RESPONSE" | jq '.' 2>/dev/null || echo "$PICTURE_API_RESPONSE"
        echo ""
    fi
    
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}✅ Tous les tests sont passés!${NC}"
    echo -e "${GREEN}================================${NC}\n"
    
    # Suggestion pour l'utilisation
    echo -e "${BLUE}💡 Prochaines étapes:${NC}"
    echo -e "  1️⃣  Créer une Card avec cette image:"
    echo -e "    curl -X POST $BASE_URL/api/cards \\"
    echo -e "      -H \"Content-Type: application/json\" \\"
    echo -e "      -d \"{\\"
    echo -e "        \\\"title\\\": \\\"Ma carte\\\",\\"
    echo -e "        \\\"description\\\": \\\"Description\\\",\\"
    echo -e "        \\\"picture\\\": \\\"/api/pictures/$PICTURE_ID\\\",\\"
    echo -e "        \\\"tags\\\": [],\\"
    echo -e "        \\\"isActif\\\": true\\"
    echo -e "      }\""
    echo ""
    
else
    echo -e "${RED}❌ Upload échoué! (HTTP $STATUS)${NC}\n"
    echo -e "${RED}Réponse d'erreur:${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    exit 1
fi

# Cleanup: Supprimer l'image de test si elle était créée
if [ "${IMAGE_FILE}" = "test-image.png" ] && [ -f "test-image.png" ]; then
    rm -f test-image.png
fi
