# ⚡ Quick Start - Greeting Card AI

## 🚀 Démarrage en 3 Étapes

### 1️⃣ Configuration

```bash
cd docker
cp .env.example .env
chmod +x manage.sh
```

### 2️⃣ Démarrer les Services

**Mode Développement (Angular hot reload):**
```bash
./manage.sh up-dev
```

**Mode Production (Angular compilé):**
```bash
./manage.sh up
```

**Ou plus simplement:**
```bash
# Depuis la racine du projet
./start.sh dev    # Développement
./start.sh prod   # Production
```

### 3️⃣ Accéder à l'Application

- 🌐 **Frontend** : http://localhost:4200
- 🔌 **API** : http://localhost:9000
- 📊 **API Docs** : http://localhost:9000/api/docs

## 📋 Commandes Essentielles

```bash
cd docker

# Démarrer/Arrêter
./manage.sh up-dev        # Développement
./manage.sh up            # Production
./manage.sh down          # Arrêter

# Logs en temps réel
./manage.sh logs          # Tous les services
./manage.sh logs-php      # PHP uniquement
./manage.sh logs-ng       # Angular uniquement

# Accès aux conteneurs
./manage.sh shell-php     # Accès shell PHP
./manage.sh shell-ng      # Accès shell Angular
./manage.sh shell-mysql   # Accès shell MySQL

# Base de données
./manage.sh db-migrate    # Exécuter les migrations
./manage.sh db-fixtures   # Charger les fixtures

# Aide
./manage.sh help
```

## 🔧 Configuration Commune

### Modifier les Ports

Éditer `docker/.env`:

```env
MYSQL_PORT=3306      # Port MySQL
PHP_PORT=9000        # Port PHP
ANGULAR_PORT=4200    # Port Angular
```

### Modifier l'Environnement

```env
APP_ENV=dev          # dev ou prod
APP_DEBUG=1          # 1 ou 0
APP_SECRET=secret    # Clé secrète
```

### Modifier les Identifiants MySQL

```env
DB_DATABASE=greeting_card
DB_USER=user
DB_PASSWORD=password
DB_ROOT_PASSWORD=root
```

## 🎯 Mode Développement

```bash
./manage.sh up-dev
```

✅ **Angular**: Serveur npm start
- Hot reload activé
- Modifications en temps réel
- Déboguer le frontend facilement

✅ **Symfony**: Mode debug
- Profiler activé
- Sources volumisées
- Xdebug configurable

✅ **MySQL**: Données persistantes

## 📦 Mode Production

```bash
./manage.sh up
```

✅ **Angular**: Build compilé + Nginx
- Optimisé et minifié
- Gzip activé
- Cache configuré

✅ **Symfony**: Mode production
- Performance optimisée
- Opcache activé

✅ **MySQL**: Données persistantes

## 🐛 Troubleshooting Rapide

### Le service ne démarre pas

```bash
cd docker
./manage.sh logs        # Voir tous les logs
```

### Port déjà utilisé

Éditer `docker/.env` et changer les ports:

```env
MYSQL_PORT=3307
PHP_PORT=9001
ANGULAR_PORT=4201
```

### Réinitialiser complètement

```bash
cd docker
./manage.sh clean      # Arrête tout et supprime les volumes
./manage.sh up-dev     # Redémarre from scratch
```

## 📚 Documentation Détaillée

- 📖 `README.md` - Vue d'ensemble
- 📖 `STRUCTURE.md` - Structure du projet
- 📖 `docker/README.md` - Guide Docker complet
- 📖 `specifications/ARCHITECTURE.md` - Architecture détaillée
- 📖 `symfony/README.md` - Guide Symfony
- 📖 `angular/README.md` - Guide Angular

## ✨ Notes Importantes

### Première Fois

1. Le téléchargement des images Docker peut prendre quelques minutes
2. La compilation initiale peut être longue
3. Tout cela n'arrive qu'une seule fois

### En Développement

- Les fichiers `symfony/` et `angular/` sont automatiquement synchronisés
- Vous pouvez éditer le code directement sans reconstruire les images
- Angular avec hot reload rechargera la page en cas de modification

### En Production

- Angular sera compilé et optimisé
- Les images sont légères grâce aux multi-stage builds
- Prêt pour le déploiement

## 🔐 Avant la Production

- ✅ Changer `APP_SECRET` dans `.env`
- ✅ Définir `APP_ENV=prod` et `APP_DEBUG=0`
- ✅ Mettre à jour les identifiants MySQL
- ✅ Configurer les certificats SSL
- ✅ Adapter `CORS_ALLOW_ORIGIN` à votre domaine

## 💡 Tips

### Utiliser un script rapide

```bash
# Depuis la racine
./start.sh dev     # Linux/Mac
start.cmd dev      # Windows
```

### Afficher l'usage mémoire

```bash
docker stats
```

### Reconstruire une image

```bash
cd docker
./manage.sh build
```

### Vider complètement Docker

```bash
cd docker
./manage.sh prune
```

## 🆘 Besoin d'Aide ?

1. Consulter `docker/README.md` pour les questions Docker
2. Consulter `symfony/README.md` pour Symfony
3. Consulter `angular/README.md` pour Angular
4. Vérifier les logs: `./manage.sh logs`

---

**C'est tout !** 🎉

Vous êtes prêt à commencer le développement de votre application.
