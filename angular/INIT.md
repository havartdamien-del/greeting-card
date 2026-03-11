# 🅰️ Angular - Greeting Card AI

## ✅ Status

L'application Angular a été initialisée avec un message de bienvenue simple.

## 📁 Structure

```
angular/
├── src/
│   ├── app/
│   │   ├── app.component.ts           # Composant principal
│   │   ├── app.component.html         # Template avec message bienvenue
│   │   ├── app.component.scss         # Styles avec animations
│   │   ├── app.component.spec.ts      # Tests unitaires
│   │   ├── app.module.ts              # Module principal
│   │   └── app-routing.module.ts      # Configuration routing
│   ├── environments/
│   │   ├── environment.ts             # Config développement
│   │   └── environment.prod.ts        # Config production
│   ├── assets/                        # Images, fonts, etc.
│   ├── index.html                     # HTML racine
│   ├── main.ts                        # Point d'entrée
│   ├── styles.scss                    # Styles globaux
│   └── test.ts                        # Configuration tests
├── package.json                       # Dépendances npm
├── angular.json                       # Configuration Angular
├── tsconfig.json                      # Configuration TypeScript
├── tsconfig.app.json                  # Config TypeScript app
├── tsconfig.spec.json                 # Config TypeScript tests
├── .prettierrc                        # Configuration Prettier
├── .prettierignore                    # Fichiers ignorés Prettier
├── .gitignore                         # Fichiers ignorés Git
└── README.md                          # Ce fichier
```

## 🚀 Lancer l'Application

### Via Docker

```bash
cd docker
./manage.sh up-dev
```

Accéder à: http://localhost:4200

### Localement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start

# Accéder à http://localhost:4200
```

## 📝 Ce qui a été Créé

✅ **Structure Angular 17**
- Module principal (`AppModule`)
- Composant racine (`AppComponent`)
- Routing configuré
- Configuration TypeScript optimisée

✅ **Message de Bienvenue**
- Design moderne avec gradient
- Animations (bounce, twinkle, pulse)
- Interface responsive
- Features showcase

✅ **Configuration**
- Environment dev et prod
- Prettier pour formatting
- Configuration build optimisée
- Tests unitaires préconfigu

## 💻 Commandes npm

```bash
# Démarrage
npm start                 # Serveur dev (http://localhost:4200)
npm run build             # Build production

# Développement
npm run watch             # Watch mode
npm test                  # Tests unitaires
npm run lint              # Linting

# Formatting
npm run format            # Formater avec Prettier
```

## 📊 Architecture du Composant Welcome

### AppComponent
Le composant principal affiche:
- Titre avec emoji 💌
- Sous-titre descriptif
- Message de bienvenue en card
- Status avec animation de pulse
- 3 features (Créatif, IA, Partage)
- Footer avec année courante

### Styles
- Gradient background (667eea → 764ba2)
- Card avec shadow et hover effect
- Animations: bounce, twinkle, pulse
- Responsive design (mobile, tablet, desktop)
- Moderne et professionnel

## 🎨 Personnalisation

### Modifier le Message de Bienvenue

Éditer `src/app/app.component.html`:

```html
<h2>Votre Message</h2>
<p>Votre description</p>
```

### Ajouter des Features

Ajouter dans le HTML:

```html
<div class="feature">
  <span class="feature-icon">🎯</span>
  <h3>Titre</h3>
  <p>Description</p>
</div>
```

### Modifier les Couleurs

Éditer `src/app/app.component.scss`:

```scss
background: linear-gradient(135deg, #votre-couleur1 0%, #votre-couleur2 100%);
```

## 🔄 Ajouter des Composants

```bash
# Accéder au shell Angular
cd docker
./manage.sh shell-ng

# Ou via npm
ng generate component components/mon-composant
# ng g c components/mon-composant
```

## 🌐 Configurer l'API

### En Développement

Éditer `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9000/api'
};
```

### En Production

Éditer `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.votre-domaine.com'
};
```

## 📦 Dépendances

### Core
- `@angular/core` - Framework Angular
- `@angular/common` - Utilitaires communs
- `@angular/platform-browser` - Plateforme navigateur
- `@angular/router` - Routing

### Utilitaires
- `rxjs` - Programmation réactive
- `tslib` - Helpers TypeScript
- `zone.js` - Zone management

### Dev
- `@angular/cli` - CLI Angular
- `typescript` - TypeScript
- `prettier` - Code formatter
- `jasmine`, `karma` - Tests

## 🧪 Tests

### Lancer les tests

```bash
npm test
```

### Ajouter un test

```bash
ng generate spec mon-composant
```

## 📚 Ressources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Docs](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🔍 Structure du Projet Réelle

```
angular/
├── dist/                      # Build output (généré)
├── node_modules/              # Dependencies (généré)
├── .angular/                  # Cache Angular (généré)
├── src/
│   ├── app/                   # Code application
│   │   └── ...
│   ├── environments/          # Configuration par env
│   ├── assets/                # Fichiers statiques
│   ├── index.html             # HTML racine
│   ├── main.ts                # Point d'entrée
│   ├── styles.scss            # Styles globaux
│   └── test.ts                # Setup tests
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .prettierrc
├── .prettierignore
└── README.md
```

## 🚀 Prochaines Étapes

1. **Créer des services**
   ```bash
   ng g service services/api
   ```

2. **Créer des composants**
   ```bash
   ng g component components/header
   ng g component components/footer
   ```

3. **Ajouter le routing**
   ```bash
   ng g component pages/home
   ng g component pages/about
   ```

4. **Intégrer l'API backend**
   - Créer des services HTTP
   - Configurer les intercepteurs
   - Gérer l'état

5. **Ajouter Material ou Bootstrap** (optionnel)
   ```bash
   ng add @angular/material
   ```

## 💡 Tips

### Hot Reload

Les modifications sont automatiquement recompilées et rechargées dans le navigateur.

### DevTools

Installer Angular DevTools: https://angular.io/guide/devtools

### Debugging

Utiliser F12 dans le navigateur et chercher les sources TypeScript.

### Performance

Utiliser `ng build --stats-json` pour analyser le bundle.

## ✨ Features Actuelles

✅ Message de bienvenue animé
✅ Design moderne et responsive
✅ Configuration d'environnement
✅ Tests unitaires configurés
✅ Build optimisé (production ready)

## 📝 Notes

- La base est maintenant prête pour ajouter des fonctionnalités
- Le design est responsive et mobile-friendly
- Les animations rendent l'interface dynamique
- Les styles sont modularisés et faciles à personnaliser

---

**Prêt à commencer! 🚀**
