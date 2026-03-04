# Stage 1: Builder PHP avec Composer
FROM php:8.2-fpm-alpine AS builder

# Installation des dépendances système pour le build
RUN apk add --no-cache \
    curl \
    git \
    zip \
    unzip \
    postgresql-dev \
    mysql-dev \
    libxml2-dev \
    oniguruma-dev \
    libzip-dev

# Installation des extensions PHP
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    zip \
    xml \
    mbstring \
    bcmath \
    intl

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers composer
COPY symfony/composer.json symfony/composer.lock* ./

# Installation des dépendances PHP
RUN composer install --no-dev --no-scripts --prefer-dist

# Stage 2: Runtime PHP-FPM
FROM php:8.2-fpm-alpine

LABEL version="1.0.0" \
      description="PHP 8.2 FPM for Greeting Card API with Symfony"

# Installation des dépendances système
RUN apk add --no-cache \
    mysql-client \
    postgresql-client \
    supervisor \
    bash \
    curl

# Installation des extensions PHP
RUN apk add --no-cache \
    postgresql-dev \
    mysql-dev \
    libxml2-dev \
    oniguruma-dev \
    libzip-dev && \
    docker-php-ext-install \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    zip \
    xml \
    mbstring \
    bcmath \
    intl && \
    apk del postgresql-dev mysql-dev libxml2-dev oniguruma-dev libzip-dev

# Configuration PHP
COPY docker/php/php.ini /usr/local/etc/php/conf.d/app.ini
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.conf

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Création du répertoire de travail
WORKDIR /app

# Copie des dépendances depuis le builder
COPY --from=builder /app/vendor ./vendor

# Copie du code source Symfony
COPY symfony/ ./

# Création des répertoires nécessaires
RUN mkdir -p \
    var/cache \
    var/log \
    var/uploads \
    public/uploads && \
    chmod -R 775 var public

# Exposition du port
EXPOSE 9000

# Commande de démarrage
CMD ["php-fpm"]
