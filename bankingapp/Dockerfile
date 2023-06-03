FROM openjdk:17-oracle

WORKDIR /app

COPY target/banking-app-0.0.1-SNAPSHOT.jar app.jar

#COPY src/main/resources/__files/ /app/config.properties

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]