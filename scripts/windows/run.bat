@echo off
REM Function to check if a command is available
REM:command_exists
REM where %1 >nul 2>nul
REM if %errorlevel% neq 0 (
REM   echo Error: %1 is not installed. Please install %1 and try again.
 REM   exit /b 1
REM)

REM Check if Docker is installed
call :command_exists docker

REM Check if Maven is installed
call :command_exists mvn

REM Check if DB_ROOT_PASSWORD is set
if "%DB_ROOT_PASSWORD%"=="" (
    echo Error: DB_ROOT_PASSWORD environment variable is not set. Set DB_ROOT_PASSWORD and try again.
    exit /b 1
)

set DB_HOST=localhost
set DB_PORT=3306

echo ==================================
echo MySQL Database Stage STARTED
echo ==================================

REM Check if the Docker network already exists
docker network inspect "student-placement-platform" >nul 2>nul
if %errorlevel% neq 0 (
    echo Creating Docker network: student-placement-platform
    docker network create "student-placement-platform"
)

REM Run MySQL container
docker run -d --name mysql-database --network student-placement-platform -p 3306:3306 -e MYSQL_ROOT_PASSWORD="%DB_ROOT_PASSWORD%" mysql:latest

REM Function to check if MySQL is ready
:wait_for_mysql
docker exec mysql-database mysql -uroot -p"%DB_ROOT_PASSWORD%" -e "status" >nul 2>nul
if %errorlevel% neq 0 (
    echo MySQL is unavailable - waiting
    timeout /t 5 /nobreak >nul
    goto wait_for_mysql
)
echo MySQL is up and running!

REM Create database
docker exec mysql-database mysql -u root -p"%DB_ROOT_PASSWORD%" -e "CREATE DATABASE IF NOT EXISTS student_placement_platform;"

echo ==================================
echo MySQL Database Stage COMPLETE
echo ==================================


echo.
echo ==================================
echo Backend Stage STARTED
echo ==================================

cd backend\ || exit /b
call mvn clean
call mvn package

REM Build backend Docker image
docker build --build-arg DB_ROOT_PASSWORD="%DB_ROOT_PASSWORD%" -t spring-boot-backend:latest -f delivery\Dockerfile .

REM Run backend container
docker run -d --name spring-boot-backend --network student-placement-platform -p 8089:8080 spring-boot-backend:latest


echo.
echo ==================================
echo Frontend Stage STARTED
echo ==================================

cd ..\frontend\ || exit /b

REM Build frontend Docker image
docker build -t react-frontend-app:latest -f delivery\Dockerfile .

REM Run frontend container
docker run -d --name react-frontend-app --network student-placement-platform -p 8088:80 react-frontend-app:latest

echo ==================================
echo Frontend Stage COMPLETE
echo ==================================

echo.

docker ps -a

exit /b
