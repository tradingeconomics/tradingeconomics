#FROM eclipse-temurin:17-jdk-alpine
#VOLUME /tmp
#COPY target/*.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
#EXPOSE 8080



# Use an official Maven image as the base image for the build stage
FROM maven:3.8.4-openjdk-17-slim AS build

## Set the working directory inside the container
#WORKDIR /app

# Copy the pom.xml file to the container
COPY . .

# Download the dependencies specified in the pom.xml file
RUN mvn dependency:go-offline -B

## Copy the application source code to the container
#COPY src ./src

# Build the application using Maven
RUN mvn package -DskipTests

# Use Eclipse Temurin JDK 19 and Alpine Linux as the base image for the final image
FROM eclipse-temurin:19-alpine
#FROM openjdk:17-jdk-slim

## Set the working directory inside the container
#WORKDIR /app

# Copy the built JAR file from the build stage to the final image
COPY --from=build target/*.jar app.jar

# Expose the port on which the Spring Boot application will listen
EXPOSE 8080

# Set the command to run the Spring Boot application when the container starts
CMD ["java", "-Dspring.profiles.active=dev", "-jar", "app.jar"]
#CMD ["java", "-Djwt_secret=${jwt_secret} -Dspring.datasource.username=${SPRING_DATASOURCE_USERNAME} -Dspring.datasource.password=${SPRING_DATASOURCE_PASSWORD} -Dspring.datasource.url=${SPRING_DATASOURCE_URL}", "-jar", "app.jar"]