# Use the base image with OpenJDK 17 and Ubuntu Focal
FROM eclipse-temurin:17-jdk-focal

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged Spring Boot application JAR file into the container
COPY target/studentplacementplatform-0.0.1.jar /app/studentplacementplatform.jar

# Expose port 8080 (default port for Spring Boot applications)
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "studentplacementplatform.jar"]