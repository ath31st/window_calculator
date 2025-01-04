FROM eclipse-temurin:21-jre-alpine
RUN apk --no-cache add dumb-init  \
    && mkdir /app  \
    && addgroup --system javauser  \
    && adduser -S -s /bin/false -G javauser javauser

COPY .env /app
COPY target/*.jar /app/window_calculator_server.jar
WORKDIR /app
RUN chown -R javauser:javauser /app
USER javauser
EXPOSE 8081
ENTRYPOINT ["dumb-init", "java", "-jar", "window_calculator_server.jar"]
