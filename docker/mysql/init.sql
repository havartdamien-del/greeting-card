-- Initialisation de la base de données MySQL pour Greeting Card
-- Ce script s'exécute automatiquement au premier lancement du conteneur

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- ============================================================================
-- Créer la base de données pour le site (production/développement)
-- ============================================================================
CREATE DATABASE IF NOT EXISTS greeting_card 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- ============================================================================
-- Créer la base de données pour les tests
-- ============================================================================
CREATE DATABASE IF NOT EXISTS greeting_card_test 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- ============================================================================
-- Créer l'utilisateur et assigner les permissions
-- ============================================================================

-- Créer l'utilisateur s'il n'existe pas
CREATE USER IF NOT EXISTS 'greeting_card_user'@'%' IDENTIFIED BY 'greeting_card_password';

-- Donner tous les privilèges sur les deux bases de données
GRANT ALL PRIVILEGES ON greeting_card.* TO 'greeting_card_user'@'%';
GRANT ALL PRIVILEGES ON greeting_card_test.* TO 'greeting_card_user'@'%';

-- Appliquer les modifications
FLUSH PRIVILEGES;

-- ============================================================================
-- Vérification
-- ============================================================================
SELECT 'Greeting Card databases initialized successfully' as initialization_status;
SELECT 'Production database: greeting_card' as info;
SELECT 'Test database: greeting_card_test' as info;

-- Show created databases
SHOW DATABASES LIKE 'greeting_card%';
