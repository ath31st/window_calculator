FROM eclipse-temurin:21-jre-alpine
RUN apk add dumb-init
RUN mkdir /app
RUN addgroup --system javauser && adduser -S -s /bin/false -G javauser javauser

COPY target/*.jar /app/window_calculator.jar
WORKDIR /app
RUN chown -R javauser:javauser /app
USER javauser
EXPOSE 8081
ENTRYPOINT ["dumb-init", "java", "-jar", "window_calculator.jar"]
