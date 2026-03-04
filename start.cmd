@echo off
REM Script de démarrage rapide pour Greeting Card AI (Windows)
REM Utilisation: start.cmd [dev|prod]

setlocal enabledelayedexpansion

set SCRIPT_DIR=%~dp0
set DOCKER_DIR=%SCRIPT_DIR%docker

REM Déterminer le mode
set MODE=%1
if "%MODE%"=="" set MODE=dev

if not "%MODE%"=="dev" (
    if not "%MODE%"=="prod" (
        echo Usage: start.cmd [dev^|prod]
        echo.
        echo dev  - Mode développement
        echo prod - Mode production
        exit /b 1
    )
)

REM Vérifier Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo Docker n'est pas installe ou n'est pas dans le PATH
    exit /b 1
)

REM Vérifier Docker Compose
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo Docker Compose n'est pas installe ou n'est pas dans le PATH
    exit /b 1
)

REM Créer le fichier .env s'il n'existe pas
if not exist "%DOCKER_DIR%\.env" (
    echo Creation du fichier .env...
    copy "%DOCKER_DIR%\.env.example" "%DOCKER_DIR%\.env"
    echo Fichier .env cree
    echo.
)

REM Démarrer les services
echo.
echo Demarrage des services en mode %MODE%...
echo.

cd "%DOCKER_DIR%"

if "%MODE%"=="dev" (
    call docker-compose -f docker-compose.dev.yml up -d
    echo.
    echo Services demarres en mode DEVELOPPEMENT
) else (
    call docker-compose -f docker-compose.yml up -d
    echo.
    echo Services demarres en mode PRODUCTION
)

echo.
echo URLs d'acces:
echo   Frontend Angular : http://localhost:4200
echo   API Backend      : http://localhost:9000
echo   API Docs         : http://localhost:9000/api/docs
echo   MySQL            : localhost:3306
echo.
echo Commandes utiles:
echo   docker-compose logs       - Afficher les logs
echo   docker-compose down       - Arreter les services
echo.
