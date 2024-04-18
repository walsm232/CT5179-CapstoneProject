#!/bin/bash

# Function to check if a command is available
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is installed
if ! command_exists docker; then
    echo "Error: Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Maven is installed
if ! command_exists mvn; then
    echo "Error: Maven is not installed. Please install Maven and try again."
    exit 1
fi

# Check if DB_ROOT_PASSWORD is set
if [ -z "$DB_ROOT_PASSWORD" ]; then
    echo "Error: DB_ROOT_PASSWORD environment variable is not set. Set DB_ROOT_PASSWORD and try again."
    exit 1
fi

export DB_HOST="localhost"
export DB_PORT="3306"

echo "=================================="
echo "MySQL Database Stage STARTED"
echo "=================================="

# Check if the Docker network already exists
if ! docker network inspect "student-placement-platform" &>/dev/null; then
    echo "Creating Docker network: student-placement-platform"
    docker network create "student-placement-platform"
fi

# Run MySQL container
docker run -d --name mysql-database --network student-placement-platform -p 3306:3306 -e MYSQL_ROOT_PASSWORD="${DB_ROOT_PASSWORD}" mysql:latest

# Function to check if MySQL is ready
wait_for_mysql() {
    until docker exec mysql-database mysql -uroot -p"${DB_ROOT_PASSWORD}" -e "status"; do
        >&2 echo "MySQL is unavailable - waiting"
        sleep 5
    done
    >&2 echo "MySQL is up and running!"
}

# Wait for MySQL to be ready
echo "Waiting for MySQL database to be up and running before creating the initial database"
wait_for_mysql

# Create database
docker exec mysql-database mysql -u root -p"${DB_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS student_placement_platform;"

echo "=================================="
echo "MySQL Database Stage COMPLETE"
echo "=================================="


echo " "


echo "=================================="
echo "Backend Stage STARTED"
echo "=================================="

cd backend/ || exit
mvn clean
mvn package

# Build backend Docker image
docker build --build-arg DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD}" -t spring-boot-backend:latest -f delivery/Dockerfile .

# Run backend container
docker run -d --name spring-boot-backend --network student-placement-platform -p 8089:8080 spring-boot-backend:latest


echo " "


echo "=================================="
echo "Frontend Stage STARTED"
echo "=================================="

cd ../frontend/ || exit

# Build frontend Docker image
docker build -t react-frontend-app:latest -f delivery/Dockerfile .

# Run frontend container
docker run -d --name react-frontend-app --network student-placement-platform -p 8088:80 react-frontend-app:latest

echo "=================================="
echo "Frontend Stage COMPLETE"
echo "=================================="

echo " "

docker ps -a