@echo off
setlocal

REM Function to check if Docker is installed
:check_docker
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker is not installed. Please install Docker and try again.
    exit /b 1
)

echo ==================================
echo Checking Docker installation
echo ==================================

REM Check if Docker is installed
call :check_docker

echo ==================================
echo Stopping and removing all containers
echo ==================================

REM Stop and remove containers
docker stop spring-boot-backend mysql-database
docker rm spring-boot-backend mysql-database

echo Containers stopped and removed successfully.

endlocal
