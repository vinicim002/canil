package com.vinicius.backend.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Falha cedo em prod se segredos obrigatórios não estiverem configurados.
 */
public class ProductionSecretsEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        if (!isProd(environment)) {
            return;
        }

        validateJwt(environment);
        validateDatabase(environment);
    }

    private static void validateJwt(ConfigurableEnvironment environment) {
        String jwtSecret = firstNonBlank(
                environment.getProperty("JWT_SECRET"),
                environment.getProperty("jwt.secret")
        );

        if (jwtSecret == null) {
            throw new IllegalStateException("""
                    JWT_SECRET não configurado no ambiente de produção.
                    No Railway: serviço backend → Variables → adicionar JWT_SECRET
                    Gere um valor seguro: openssl rand -base64 32
                    """);
        }

        if (jwtSecret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException(
                    "JWT_SECRET muito curto. Use no mínimo 32 bytes (ex.: openssl rand -base64 32).");
        }
    }

    private static void validateDatabase(ConfigurableEnvironment environment) {
        String url = firstNonBlank(
                environment.getProperty("spring.datasource.url"),
                environment.getProperty("DB_URL"),
                environment.getProperty("DATABASE_URL")
        );
        if (url != null || hasText(environment.getProperty("PGHOST"))) {
            return;
        }

        throw new IllegalStateException("""
                Banco PostgreSQL não configurado no ambiente de produção.
                No Railway: serviço backend → Variables → Add Reference → selecione o Postgres
                Referencie pelo menos DATABASE_URL (ou PGHOST, PGPORT, PGUSER, PGPASSWORD).
                """);
    }

    private static boolean isProd(ConfigurableEnvironment environment) {
        if (Arrays.asList(environment.getActiveProfiles()).contains("prod")) {
            return true;
        }
        String profiles = firstNonBlank(
                environment.getProperty("SPRING_PROFILES_ACTIVE"),
                environment.getProperty("spring.profiles.active")
        );
        return profiles != null && Arrays.stream(profiles.split(","))
                .map(String::trim)
                .anyMatch("prod"::equals);
    }

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }
}
