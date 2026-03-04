# Dockerfile pour MySQL 8.0
FROM mysql:8.0-alpine

ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD:-root}
ENV MYSQL_DATABASE=${DB_DATABASE:-greeting_card}
ENV MYSQL_USER=${DB_USER:-user}
ENV MYSQL_PASSWORD=${DB_PASSWORD:-password}

# Copie du fichier de configuration MySQL
COPY docker/mysql/my.cnf /etc/mysql/conf.d/my.cnf

# Copie du script d'initialisation
COPY docker/mysql/init.sql /docker-entrypoint-initdb.d/

# Changement des permissions
RUN chmod 644 /etc/mysql/conf.d/my.cnf && \
    chmod 644 /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306

LABEL version="1.0.0" \
      description="MySQL 8.0 for Greeting Card API"
