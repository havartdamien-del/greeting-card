# Jest Testing Environment for Angular
FROM node:20-alpine

LABEL version="1.0.0" \
      description="Jest Testing Environment for Greeting Card"

WORKDIR /app

# Copie des fichiers package
COPY angular/package.json angular/package-lock.json* ./

# Installation des dépendances
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f package.json ]; then npm install; \
    fi

# Copie du code source
COPY angular/ ./

# Exposition du port Karma (utilisé par défaut)
EXPOSE 9876

# Commande de démarrage pour les tests
CMD ["npm", "run", "test"]
