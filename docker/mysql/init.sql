-- Initialisation de la base de données MySQL pour Greeting Card
-- Ce script s'exécute automatiquement au premier lancement du conteneur

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Vérifier que la base de données a bien été créée
SELECT 'Greeting Card Database initialized successfully' as initialization_status;

-- Vous pouvez ajouter ici vos scripts d'initialisation personnalisés
-- Les migrations Doctrine seront exécutées via docker-compose lors du démarrage
