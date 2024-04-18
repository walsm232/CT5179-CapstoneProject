#!/bin/bash

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &>/dev/null; then
        echo "Error: Docker is not installed. Please install Docker and try again."
        exit 1
    else
        echo "Docker is installed, continuing..."
    fi
}

echo "=================================="
echo "Checking Docker installation"
echo "=================================="
# Check if Docker is installed
check_docker

echo " "

echo "=================================="
echo "Stopping and removing all containers"
echo "=================================="

# Stop and remove containers
docker stop spring-boot-backend react-frontend-app mysql-database
docker rm spring-boot-backend react-frontend-app mysql-database

echo "Containers stopped and removed successfully."
