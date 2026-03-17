#!/bin/bash

# 🚀 Script de déploiement rapide - Upload d'images
# Exécute toutes les étapes nécessaires pour installer la fonctionnalité

set -e  # Exit on error

echo "📤 Installation de la fonctionnalité Upload d'images"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Étape 1: Migration
echo -e "${BLUE}1️⃣  Exécution de la migration...${NC}"
docker-compose exec symfony php bin/console doctrine:migrations:migrate --no-interaction
echo -e "${GREEN}✅ Migration exécutée${NC}"
echo ""

# Étape 2: Créer le répertoire
echo -e "${BLUE}2️⃣  Création du répertoire d'uploads...${NC}"
docker-compose exec symfony mkdir -p public/uploads
docker-compose exec symfony chmod 755 public/uploads
echo -e "${GREEN}✅ Répertoire créé${NC}"
echo ""

# Étape 3: Vérifier la base de données
echo -e "${BLUE}3️⃣  Vérification de la structure base de données...${NC}"
docker-compose exec mysql mysql -u root -proot greeting_card -e "DESCRIBE picture;" | grep value
echo -e "${GREEN}✅ Structure vérifiée${NC}"
echo ""

# Étape 4: Test de base
echo -e "${BLUE}4️⃣  Test de connectivité...${NC}"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/pictures/upload | grep -q "405\|415\|400"; then
    echo -e "${GREEN}✅ Serveur accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Serveur temporairement inaccessible (réessayez)${NC}"
fi
echo ""

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Installation terminée!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${BLUE}📝 Prochaines étapes:${NC}"
echo ""
echo -e "1. Rendre le script de test exécutable:"
echo -e "   ${YELLOW}chmod +x test_upload.sh${NC}"
echo ""
echo -e "2. Lancer le test:"
echo -e "   ${YELLOW}./test_upload.sh${NC}"
echo ""
echo -e "3. Tester un upload manuel:"
echo -e "   ${YELLOW}curl -X POST http://localhost:8080/api/pictures/upload \\${NC}"
echo -e "   ${YELLOW}  -F 'file=@/path/to/image.jpg'${NC}"
echo ""
echo -e "📚 Documentation disponible:"
echo -e "   - ${YELLOW}CURL_EXAMPLES.md${NC} - Exemples curl rapides"
echo -e "   - ${YELLOW}PICTURE_UPLOAD_API.md${NC} - Documentation complète"
echo -e "   - ${YELLOW}UPLOAD_FEATURE_SUMMARY.md${NC} - Résumé complet"
echo ""
