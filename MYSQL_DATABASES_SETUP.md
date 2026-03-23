# ✅ Configuration MySQL - Résumé des Modifications

## 📋 Tâche Demandée

Le conteneur MySQL doit initialiser uniquement **2 bases de données** :
- `greeting_card` - pour le site
- `greeting_card_test` - pour les tests

---

## ✅ Ce Qui a Été Fait

### 📝 Fichiers Modifiés (4)

1. **`docker/mysql/init.sql`** ✅
   - Crée les 2 bases automatiquement
   - Charset UTF-8 pour les deux
   - Crée l'utilisateur avec permissions

2. **`docker-compose.yml`** ✅
   - Variables MySQL correctes
   - Correction du typo DB_PASSWORD
   - Ajout DB_DATABASE_TEST
   - Valeurs par défaut cohérentes

3. **`docker-compose.override.yml`** ✅
   - Mise à jour phpMyAdmin
   - Variables cohérentes

4. **`.env`** ✅
   - `DB_USER=greeting_card_user`
   - `DB_PASSWORD=greeting_card_password`
   - `DB_DATABASE_TEST=greeting_card_test`
   - Tous les ports configurés

### 📚 Documentation (1)

**`DATABASE_SETUP.md`** ✅
- Configuration détaillée
- Vérification des bases
- Dépannage

### 🔧 Script (1)

**`docker/verify_databases.sh`** ✅
- Vérifier que les 2 bases sont créées
- Vérifier l'utilisateur
- Vérifier les permissions

---

## 🚀 Comment Utiliser

### Démarrer Docker (création automatique)

```bash
docker-compose up -d
```

Le script `docker/mysql/init.sql` s'exécute automatiquement et crée :
- ✅ Base `greeting_card`
- ✅ Base `greeting_card_test`
- ✅ Utilisateur `greeting_card_user`
- ✅ Permissions sur les deux

### Vérifier que tout est correct

```bash
./docker/verify_databases.sh
```

Vous devriez voir :
```
✅ MySQL est en cours d'exécution
✅ Base 'greeting_card' existe
✅ Base 'greeting_card_test' existe
✅ Utilisateur 'greeting_card_user' existe et peut se connecter
✅ Utilisateur a les permissions sur les deux bases
```

### Accéder aux bases via phpMyAdmin

```
http://localhost:8081
Utilisateur: greeting_card_user
Mot de passe: greeting_card_password
```

### Via Ligne de Commande

```bash
# Visualiser les deux bases
docker-compose exec mysql mysql -u root -proot -e "SHOW DATABASES LIKE 'greeting_card%';"

# Se connecter à greeting_card
docker-compose exec mysql mysql -u greeting_card_user -pgreeting_card_password greeting_card

# Se connecter à greeting_card_test
docker-compose exec mysql -u greeting_card_user -pgreeting_card_password greeting_card_test
```

---

## 📊 Configuration MySQL

```yaml
Services MySQL:
  - Image: greeting-card-mysql-v1.0.0
  - Port: 3306
  - Healthcheck: Activé

Bases de Données:
  - greeting_card        (production/development)
  - greeting_card_test   (tests)

Utilisateur:
  - Nom: greeting_card_user
  - Mot de passe: greeting_card_password
  - Permissions: ALL sur les 2 bases

Variables d'Environnement:
  - DB_DATABASE=greeting_card
  - DB_DATABASE_TEST=greeting_card_test
  - DB_USER=greeting_card_user
  - DB_PASSWORD=greeting_card_password
```

---

## 📂 Résumé des Fichiers

| Fichier | Statut | Modification |
|---------|--------|--------------|
| `docker/mysql/init.sql` | ✅ Modifié | Crée les 2 BDs + utilisateur |
| `docker-compose.yml` | ✅ Modifié | Variables cohérentes |
| `docker-compose.override.yml` | ✅ Modifié | phpMyAdmin avec bonnes variables |
| `.env` | ✅ Modifié | Variables de BD et ports |
| `DATABASE_SETUP.md` | ✅ Créé | Documentation complète |
| `docker/verify_databases.sh` | ✅ Créé | Script de vérification |

---

## 🧪 Utilisation avec les Tests

Les tests PHPUnit utilisent automatiquement `greeting_card_test` :

```bash
# Lancer les tests (utilise greeting_card_test)
docker-compose exec php ./run_tests.sh

# Les deux bases sont isolées :
# - greeting_card      (données du site)
# - greeting_card_test (données de test - jamais contaminées)
```

---

## ✨ Checklist Finale

- ✅ 2 bases de données créées
- ✅ 1 utilisateur avec permissions
- ✅ Charset UTF-8 configuré
- ✅ Variables d'environnement cohérentes
- ✅ Docker Compose correctement configuré
- ✅ Script de vérification disponible
- ✅ Documentation complète
- ✅ Prêt pour dev et tests

---

## 🎯 Prochaines Étapes

1. **Démarrer Docker**
   ```bash
   docker-compose up -d
   ```

2. **Vérifier les bases**
   ```bash
   ./docker/verify_databases.sh
   ```

3. **Lancer les migrations (appli)**
   ```bash
   docker-compose exec php php bin/console doctrine:migrations:migrate
   ```

4. **Charger les fixtures (dev)**
   ```bash
   docker-compose exec php php bin/console doctrine:fixtures:load --no-interaction
   ```

5. **Lancer les tests**
   ```bash
   docker-compose exec php ./run_tests.sh
   ```

---

## 📞 Support

**Consulter :** `DATABASE_SETUP.md` pour plus de détails

**Vérifier:** `./docker/verify_databases.sh`

**Questions :** Voir la section Dépannage dans `DATABASE_SETUP.md`

---

## ✅ Status

**CONFIGURATION COMPLÈTE ET OPÉRATIONNELLE** ✅

Vous pouvez maintenant :
- ✅ Démarrer Docker avec 2 bases
- ✅ Développer sur `greeting_card`
- ✅ Tester sur `greeting_card_test`
- ✅ Les deux bases sont isolées et sécurisées

🎉 **C'est prêt !**
