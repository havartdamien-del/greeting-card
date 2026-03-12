# Stage 1: Builder Node avec les dépendances npm
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers package
# COPY angular/package.json angular/package-lock.json* ./

# Installation des dépendances
# RUN npm ci

# Copie du code source
COPY angular/ ./

RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f package.json ]; then npm install; \
    fi

# Stage 2: Runtime pour développement
FROM node:20-alpine AS development

LABEL version="1.0.0" \
      description="Angular Development Server for Greeting Card"

WORKDIR /app

# Copie des dépendances depuis le builder
COPY --from=builder /app/node_modules ./node_modules

# Copie du code source
COPY angular/ ./

# Exposition du port Angular
EXPOSE 4200

# Commande de démarrage pour le développement
CMD ["npm", "start"]

# Stage 3: Production build
FROM node:20-alpine AS production-builder

WORKDIR /app

# Copie des fichiers package
COPY angular/package.json angular/package-lock.json* ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY angular/ ./

# Build de l'application Angular
RUN npm run build -- --configuration production

# Stage 4: Nginx pour la production
FROM nginx:alpine AS production

LABEL version="1.0.0" \
      description="Angular Production Server for Greeting Card"

# Copie de la configuration Nginx
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/php-proxy.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers buildés depuis le stage précédent
COPY --from=production-builder /app/dist /usr/share/nginx/html

# Exposition du port
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
