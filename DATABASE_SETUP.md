# 🗄️ Configuration des Bases de Données MySQL

## 📋 Vue d'Ensemble

Le conteneur MySQL est maintenant configuré pour initialiser **2 bases de données** automatiquement :

1. **`greeting_card`** - Base de données pour le site (production/développement)
2. **`greeting_card_test`** - Base de données pour les tests PHPUnit

---

## ✅ Fichiers Modifiés

### 1. **`docker/mysql/init.sql`** ✅
Script d'initialisation MySQL qui crée :
- ✅ Base de données `greeting_card` (charset UTF-8)
- ✅ Base de données `greeting_card_test` (charset UTF-8)
- ✅ Utilisateur `greeting_card_user` avec permissions
- ✅ Permissions sur les deux bases de données

### 2. **`docker-compose.yml`** ✅
Mise à jour de la configuration :
- ✅ Variables d'environnement pour MySQL
- ✅ Correction du mot de passe (typo `DB_UDB_PASSWORDSER` → `DB_PASSWORD`)
- ✅ Ajout de `DB_DATABASE_TEST`
- ✅ Valeurs par défaut cohérentes

### 3. **`docker-compose.override.yml`** ✅
Mise à jour de phpMyAdmin :
- ✅ Utilise les bonnes variables de base de données

### 4. **`.env`** ✅
Mise à jour des variables d'environnement :
- ✅ `DB_USER=greeting_card_user` (au lieu de `user`)
- ✅ `DB_PASSWORD=greeting_card_password` (au lieu de `password`)
- ✅ Ajout de `DB_DATABASE_TEST=greeting_card_test`
- ✅ Ajout d'autres variables de port

---

## 🔑 Variables d'Environnement

```env
# Base de données pour le site
DB_DATABASE=greeting_card

# Base de données pour les tests
DB_DATABASE_TEST=greeting_card_test

# Identifiants MySQL
DB_USER=greeting_card_user
DB_PASSWORD=greeting_card_password
DB_ROOT_PASSWORD=root

# MySQL
DB_HOST=mysql
DB_PORT=3306
```

---

## 🚀 Premier Lancement

Quand vous lancez Docker pour la première fois :

```bash
docker-compose up -d
```

Le script `docker/mysql/init.sql` s'exécute automatiquement et :

1. ✅ Crée la base de données `greeting_card`
2. ✅ Crée la base de données `greeting_card_test`
3. ✅ Crée l'utilisateur `greeting_card_user`
4. ✅ Attribue les permissions sur les deux bases

---

## 📊 Vérifier les Bases Créées

### Via phpMyAdmin (Interface Web)
```
http://localhost:8081
Username: greeting_card_user
Password: greeting_card_password
```

### Via Ligne de Commande
```bash
docker-compose exec mysql mysql -u root -proot -e "SHOW DATABASES LIKE 'greeting_card%';"
```

Vous devriez voir :
```
+----------------------+
| Database             |
+----------------------+
| greeting_card        |
| greeting_card_test   |
+----------------------+
```

---

## 🔄 Flux de Données

### Développement/Production
```
Application Symfony
       ↓
Base de données "greeting_card"
       ↓
Données du site (cards, users, etc.)
```

### Tests PHPUnit
```
Tests PHPUnit
       ↓
Base de données "greeting_card_test"
       ↓
Données isolées de test (ne contamine pas la BD de prod)
```

---

## 📝 Configuration Symfony

### Fichier `.env` (Symfony)
```env
# Pour le site
DATABASE_URL="mysql://greeting_card_user:greeting_card_password@mysql:3306/greeting_card"

# Pour les tests (automatiquement suffixé avec _test par Doctrine)
# Dans l'environnement test, Doctrine ajoute "_test" au nom de la BD
```

### Fichier `.env.test` (Symfony)
```env
# Doctrine va utiliser "greeting_card_test" pour les tests
KERNEL_CLASS='App\Kernel'
APP_SECRET='$ecretf0rt3st'
```

---

## 🧪 Tests PHPUnit

Les tests PHPUnit utilisent automatiquement la base de données `greeting_card_test` :

```bash
# Lancer les tests
docker-compose exec php ./run_tests.sh

# Les tests :
# 1. Créent les tables dans greeting_card_test
# 2. Chargent les fixtures
# 3. Exécutent les tests
# 4. La BD de prod (greeting_card) n'est pas affectée
```

---

## 🔧 Réinitialiser les Bases

### Supprimer et Recréer

Si vous voulez réinitialiser complètement :

```bash
# 1. Arrêter Docker
docker-compose down

# 2. Supprimer le volume MySQL
docker volume rm greeting-card-mysql_data

# 3. Redémarrer (va relancer le script init.sql)
docker-compose up -d
```

### Réinitialiser Seulement les Tables (Garder les Données)

```bash
# Supprimer et recréer les tables
docker-compose exec php php bin/console doctrine:migrations:migrate --env=prod
```

---

## 📋 Checklist de Configuration

- ✅ Deux bases de données créées
- ✅ Utilisateur avec permissions sur les deux bases
- ✅ Charset UTF-8 pour les deux bases
- ✅ Fichier `.env` avec les bonnes variables
- ✅ docker-compose.yml configuré correctement
- ✅ Script init.sql exécuté automatiquement

---

## 🎯 À Faire Ensuite

1. **Démarrer Docker**
   ```bash
   docker-compose up -d
   ```

2. **Vérifier les bases**
   ```bash
   docker-compose exec mysql mysql -u root -proot -e "SHOW DATABASES LIKE 'greeting_card%';"
   ```

3. **Lancer les migrations** (pour le site)
   ```bash
   docker-compose exec php php bin/console doctrine:migrations:migrate
   ```

4. **Charger les fixtures** (pour le développement)
   ```bash
   docker-compose exec php php bin/console doctrine:fixtures:load --no-interaction
   ```

5. **Lancer les tests**
   ```bash
   docker-compose exec php ./run_tests.sh
   ```

---

## 📞 Dépannage

### Problème : "Base de données 'greeting_card' n'existe pas"

**Solution :** Les bases ne sont créées que lors du premier lancement de MySQL.

```bash
docker-compose down
docker volume rm greeting-card-mysql_data
docker-compose up -d
```

### Problème : "Accès refusé pour l'utilisateur"

**Vérifier les variables dans `.env` :**
```bash
grep DB_ .env
```

Doit afficher :
```
DB_DATABASE=greeting_card
DB_DATABASE_TEST=greeting_card_test
DB_USER=greeting_card_user
DB_PASSWORD=greeting_card_password
```

### Problème : Les tests échouent "Impossible de créer la BD de test"

Verifiez que la BD `greeting_card_test` existe :
```bash
docker-compose exec mysql mysql -u greeting_card_user -pgreeting_card_password -e "SHOW DATABASES;"
```

---

## 📚 Fichiers de Référence

- `docker/mysql/init.sql` - Script d'initialisation
- `docker/mysql/my.cnf` - Configuration MySQL
- `.env` - Variables d'environnement
- `docker-compose.yml` - Configuration des services
- `symfony/.env` - Variables Symfony
- `symfony/.env.test` - Variables tests

---

## ✨ Résumé

**Vous avez maintenant :**
- ✅ 2 bases de données MySQL automatiquement créées
- ✅ 1 utilisateur avec permissions sur les deux
- ✅ Configuration cohérente dans `.env`
- ✅ Séparation entre prod et tests
- ✅ Prêt pour développement et tests

**Commande de démarrage :**
```bash
docker-compose up -d
```

C'est tout ! 🎉
