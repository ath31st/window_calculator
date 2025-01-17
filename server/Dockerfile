FROM eclipse-temurin:21-jdk-alpine AS base

FROM base AS builder
RUN apk add --no-cache maven
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM base AS runner
RUN apk --no-cache add dumb-init \
    && mkdir /app \
    && addgroup --system javauser \
    && adduser -S -s /bin/false -G javauser javauser

COPY --from=builder /app/target/*.jar /app/window_calculator_server.jar
COPY .env /app
WORKDIR /app
RUN chown -R javauser:javauser /app
USER javauser
EXPOSE 8081
ENTRYPOINT ["dumb-init", "java", "-jar", "window_calculator_server.jar"]
