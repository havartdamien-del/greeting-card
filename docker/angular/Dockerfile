
# =========================
# Base image
# =========================
FROM node:22-alpine AS base
 
# Variables d'environnement communes
ENV NODE_ENV=development \
    NPM_CONFIG_LOGLEVEL=warn
 
# Dépendances système utiles (ex: pour node-gyp si besoin)
RUN apk add --no-cache libc6-compat
 
WORKDIR /app
 
# Copie des fichiers de dépendances uniquement (optimise le cache Docker)
COPY angular/package*.json ./
 
# =========================
# DEV image
# =========================
FROM base AS dev
 
ENV NODE_ENV=development

# tool for dev
RUN apk add --no-cache \
    bash 

COPY angular/package*.json ./

# Installation de toutes les dépendances (dev incluses)
# RUN npm ci
 
# Copie du code source
COPY angular/ ./
 
# Exposition du port Angular
EXPOSE 4200
 
# Commande de démarrage pour le développement
# --host 0.0.0.0 requis pour être accessible depuis Docker
# CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
 
# =========================
# BUILD image (intermédiaire)
# =========================
FROM base AS build
 
ENV NODE_ENV=production
 
# Installation des dépendances de production + devDependencies nécessaires au build
# attention ici il faut ajouter "--include=dev" sinon le "npm run build" ne fonctionnera pas
RUN npm ci --include=dev
 
# Copie du code source
COPY angular/ ./
 
# Build de l'application Angular
RUN npm run build
 
# =========================
# PROD image
# =========================
FROM nginx:alpine AS prod
 
# Copie de la config nginx personnalisée
COPY --from=build /app/dist/*/browser /usr/share/nginx/html
 
COPY docker/angular/nginx-angular-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80