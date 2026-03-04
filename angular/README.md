# 🅰️ Angular Frontend - Greeting Card AI

## 📂 Structure du Projet

Ce répertoire contient le code source du frontend Angular.

```
angular/
├── src/
│   ├── app/                    # Code source de l'application
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/             # Pages de l'application
│   │   ├── services/          # Services (API, état, etc.)
│   │   ├── models/            # Modèles TypeScript
│   │   ├── guards/            # Guards de route
│   │   └── interceptors/       # Intercepteurs HTTP
│   ├── assets/                 # Images, styles, fonts
│   ├── environments/           # Configuration par environnement
│   ├── index.html             # HTML principal
│   ├── main.ts                # Point d'entrée
│   └── styles.scss            # Styles globaux
├── angular.json               # Configuration Angular
├── tsconfig.json              # Configuration TypeScript
├── package.json               # Dépendances npm
└── README.md                  # Ce fichier
```

## 🛠️ Installation

### Via Docker

```bash
cd docker
./manage.sh up-dev
```

### Localement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Ouvrir http://localhost:4200
```

## 📝 Commandes Courantes

### Développement

```bash
# Démarrer le serveur de développement
npm start

# Compiler en production
npm run build

# Lancer les tests
npm test

# Lancer e2e tests
npm run e2e

# Linter le code
npm run lint

# Formatter le code
npm run format
```

### Via Docker

```bash
cd docker

# Démarrer en mode développement (npm start)
./manage.sh up-dev

# Ou en mode production (npm build)
./manage.sh up

# Logs Angular
./manage.sh logs-ng

# Shell Angular
./manage.sh shell-ng
```

## 🎨 Composants

### Créer un Composant

```bash
ng generate component components/mon-composant
# ou
ng g c components/mon-composant
```

### Structure d'un Composant

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-mon-composant',
  templateUrl: './mon-composant.component.html',
  styleUrls: ['./mon-composant.component.scss']
})
export class MonComposantComponent {
  titre = 'Mon Composant';
}
```

## 🌐 Services et API

### Créer un Service

```bash
ng generate service services/mon-service
```

### Service API Example

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = '/api/articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getArticle(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createArticle(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateArticle(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
```

## 🗂️ Routing

### Configurer les Routes

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 🧪 Tests

### Créer un Test

```bash
ng generate spec mon-composant
```

### Exécuter les Tests

```bash
# Tests unitaires
npm test

# Tests e2e
npm run e2e

# Coverage
ng test --code-coverage
```

## 📦 Dépendances Principales

```json
{
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "rxjs": "^7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  }
}
```

## 🎯 Configuration par Environnement

### Development vs Production

```typescript
// src/environments/environment.ts (développement)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9000/api'
};

// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.votre-domaine.com'
};
```

### Utiliser l'Environnement

```typescript
import { environment } from '../environments/environment';

export class ApiService {
  private apiUrl = environment.apiUrl;
}
```

## 🔐 Intercepteurs HTTP

### Exemple d'Intercepteur pour l'Authentification

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}
```

### Enregistrer l'Intercepteur

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

## 🎨 Styles

### Utiliser SCSS

```scss
// src/styles.scss
@import 'variables';

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

// Dans un composant
/* mon-composant.component.scss */
.container {
  padding: 20px;
  background-color: #f5f5f5;

  .titre {
    font-size: 24px;
    font-weight: bold;
  }
}
```

## 🚀 Build et Déploiement

### Build de Production

```bash
# Optimisé et minifié
npm run build

# Ou via Docker
cd docker
./manage.sh up
```

### Résultat du Build

```
dist/
└── greeting-card-ai/
    ├── index.html
    ├── main.js
    ├── polyfills.js
    ├── styles.js
    └── assets/
```

## 🐛 Debugging

### VS Code Debugger

Dans `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Angular",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### Voir les Logs

```bash
cd docker
./manage.sh logs-ng
```

## 📚 Documentation

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Tips

### Utiliser les Signals Angular (v16+)

```typescript
import { signal } from '@angular/core';

export class MonComposant {
  count = signal(0);
  increment() {
    this.count.update(v => v + 1);
  }
}
```

### Utiliser les Standalone Components (v14+)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mon-composant',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Mon Composant</div>`
})
export class MonComposant {}
```

### Hot Module Replacement (HMR)

```bash
ng serve --hmr
```

## 🆘 Troubleshooting

### Port 4200 déjà utilisé

```bash
ng serve --port 4201
```

### Erreur "CORS"

Vérifier que l'API backend autorise les requêtes depuis le frontend (configuration CORS).

### Build très lent

```bash
# Vérifier les dépendances inutiles
npm audit

# Mettre à jour les packages
npm update

# Utiliser le cache
ng build --configuration production --aot
```

### Vider le cache Angular

```bash
rm -rf .angular/cache
npm start
```
