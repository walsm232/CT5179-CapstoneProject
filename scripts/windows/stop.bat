@echo off
REM Function to check if Docker is installed
:check_docker
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker is not installed. Please install Docker and try again.
    exit /b 1
) else (
    echo Docker is installed, continuing...
)

echo ==================================
echo Checking Docker installation
echo ==================================

echo.

echo ==================================
echo Stopping and removing all containers
echo ==================================

REM Stop and remove containers
docker stop spring-boot-backend react-frontend-app mysql-database
docker rm spring-boot-backend react-frontend-app mysql-database

echo Containers stopped and removed successfully.

exit /b
