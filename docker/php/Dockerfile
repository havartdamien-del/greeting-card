# =========================
# Base image
# =========================
FROM php:8.3-fpm-alpine AS base

WORKDIR /app

RUN apk add --no-cache \
    git \
    unzip \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    curl \
    bash \
    $PHPIZE_DEPS

RUN docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    zip \
    opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configuration PHP
COPY docker/php/php.ini /usr/local/etc/php/conf.d/app.ini
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.conf


# =========================
# DEV image
# =========================
FROM base AS dev

ARG UID=1000
ARG GID=1000

RUN addgroup -g ${GID} symfony \
 && adduser -D -u ${UID} -G symfony symfony

# Symfony CLI
RUN curl -fsSL https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

WORKDIR /app

COPY symfony/ /app/

RUN composer install

# Droits sur le dossier projet
RUN mkdir -p /var/run/php /var/log/php /var/run/php-fpm \
    && chown -R symfony:symfony /var/run/php /var/log/php /usr/local/var/log/ /var/run/php-fpm \
    && chown -R symfony:symfony /app

# Entrypoint
COPY docker/php/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER symfony

# ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm", "-F"]


# =========================
# PROD image
# =========================
FROM base AS prod

# ARG UID=1000
# ARG GID=1000

# RUN addgroup -g ${GID} symfony \
#  && adduser -D -u ${UID} -G symfony symfony

RUN addgroup -S symfony \
 && adduser -S -G symfony symfony

WORKDIR /app

ENV APP_ENV=prod

COPY symfony/ /app/

RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --optimize-autoloader

# Droits sur le dossier projet
RUN mkdir -p /var/run/php /var/log/php /var/run/php-fpm \
    && chown -R symfony:symfony /var/run/php /var/log/php /usr/local/var/log/ /var/run/php-fpm \
    && chown -R symfony:symfony /app

USER symfony

CMD ["php-fpm", "-F"]