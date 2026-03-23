#!/bin/bash

# 🔍 Script de Vérification - Configuration MySQL 2 Bases de Données

echo "🔍 Vérification de la configuration MySQL..."
echo "═════════════════════════════════════════════════════════════════"
echo ""

# Vérifier que Docker est en cours d'exécution
echo "1️⃣ Vérification que Docker Compose est lancé..."
if ! docker-compose ps | grep -q "mysql"; then
    echo "❌ MySQL n'est pas en cours d'exécution"
    echo "   Lancez: docker-compose up -d"
    exit 1
fi
echo "✅ MySQL est en cours d'exécution"
echo ""

# Vérifier que les bases de données existent
echo "2️⃣ Vérification des bases de données..."
echo ""

docker-compose exec mysql mysql -u root -proot -e "
SHOW DATABASES LIKE 'greeting_card%';
" 2>/dev/null | tail -n +2

# Vérifier l'existence de greeting_card
if docker-compose exec mysql mysql -u root -proot -e "USE greeting_card;" 2>/dev/null; then
    echo "✅ Base 'greeting_card' existe"
else
    echo "❌ Base 'greeting_card' n'existe pas"
fi

# Vérifier l'existence de greeting_card_test
if docker-compose exec mysql mysql -u root -proot -e "USE greeting_card_test;" 2>/dev/null; then
    echo "✅ Base 'greeting_card_test' existe"
else
    echo "❌ Base 'greeting_card_test' n'existe pas"
fi

echo ""
echo "3️⃣ Vérification de l'utilisateur..."

# Vérifier l'utilisateur
if docker-compose exec mysql mysql -u greeting_card_user -pgreeting_card_password -e "SELECT USER();" 2>/dev/null | grep -q "greeting_card_user"; then
    echo "✅ Utilisateur 'greeting_card_user' existe et peut se connecter"
else
    echo "❌ Utilisateur 'greeting_card_user' n'existe pas ou ne peut pas se connecter"
fi

echo ""
echo "4️⃣ Vérification des permissions..."

# Vérifier les permissions
PERMS=$(docker-compose exec mysql mysql -u root -proot -e "SHOW GRANTS FOR 'greeting_card_user'@'%';" 2>/dev/null | grep -c "greeting_card")
if [ "$PERMS" -ge 2 ]; then
    echo "✅ Utilisateur a les permissions sur les deux bases"
else
    echo "❌ Permissions non correctement assignées"
fi

echo ""
echo "𝕯 Informations Supplémentaires"
echo "═════════════════════════════════════════════════════════════════"
echo ""
echo "phpMyAdmin:"
echo "  URL: http://localhost:8081"
echo "  Utilisateur: greeting_card_user"
echo "  Mot de passe: greeting_card_password"
echo ""
echo "Ligne de commande MySQL:"
echo "  docker-compose exec mysql mysql -u greeting_card_user -pgreeting_card_password"
echo ""
echo "═════════════════════════════════════════════════════════════════"
echo "✅ Vérification complète !"
echo "═════════════════════════════════════════════════════════════════"
