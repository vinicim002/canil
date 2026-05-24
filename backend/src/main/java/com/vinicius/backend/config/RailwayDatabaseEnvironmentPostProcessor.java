package com.vinicius.backend.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Normaliza credenciais do PostgreSQL no Railway para propriedades Spring JDBC.
 * Aceita DATABASE_URL, DB_URL ou PGHOST/PGPORT/PGDATABASE.
 */
public class RailwayDatabaseEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final String SOURCE = "railwayDatabase";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Map<String, Object> props = new HashMap<>();

        String dbUrl = resolveDbUrl(environment, props);
        if (!hasText(dbUrl)) {
            dbUrl = normalizeConfiguredUrl(environment.getProperty("spring.datasource.url"), props);
        }

        if (!hasText(dbUrl)) {
            return;
        }

        props.put("DB_URL", dbUrl);
        props.put("spring.datasource.url", dbUrl);
        props.putIfAbsent("spring.datasource.username", resolveUsername(environment, props));
        props.putIfAbsent("spring.datasource.password", resolvePassword(environment, props));

        environment.getPropertySources().addFirst(new MapPropertySource(SOURCE, props));
    }

    private static String normalizeConfiguredUrl(String configuredUrl, Map<String, Object> props) {
        if (!hasText(configuredUrl) || configuredUrl.startsWith("jdbc:")) {
            return configuredUrl != null && configuredUrl.startsWith("jdbc:") ? ensureSsl(configuredUrl) : null;
        }
        if (configuredUrl.startsWith("postgresql://") || configuredUrl.startsWith("postgres://")) {
            parseCredentials(configuredUrl, props);
            return ensureSsl(normalizeJdbcUrl(configuredUrl));
        }
        return null;
    }

    static String resolveDbUrl(ConfigurableEnvironment environment, Map<String, Object> props) {
        String manualDbUrl = environment.getProperty("DB_URL");
        if (hasText(manualDbUrl)) {
            return ensureSsl(normalizeJdbcUrl(manualDbUrl));
        }

        String databaseUrl = environment.getProperty("DATABASE_URL");
        if (hasText(databaseUrl)) {
            if (databaseUrl.startsWith("jdbc:")) {
                return ensureSsl(databaseUrl);
            }
            parseCredentials(databaseUrl, props);
            return ensureSsl(toJdbcUrl(databaseUrl));
        }

        String host = environment.getProperty("PGHOST");
        if (!hasText(host)) {
            return null;
        }

        String port = firstNonBlank(environment.getProperty("PGPORT"), "5432");
        String database = firstNonBlank(
                environment.getProperty("PGDATABASE"),
                environment.getProperty("POSTGRES_DB"),
                "railway"
        );
        return ensureSsl("jdbc:postgresql://" + host + ":" + port + "/" + database);
    }

    static String ensureSsl(String jdbcUrl) {
        if (!hasText(jdbcUrl) || jdbcUrl.contains("sslmode=")) {
            return jdbcUrl;
        }
        if (jdbcUrl.contains(".railway.internal")
                || jdbcUrl.contains("localhost")
                || jdbcUrl.contains("127.0.0.1")) {
            return jdbcUrl;
        }
        return jdbcUrl + (jdbcUrl.contains("?") ? "&" : "?") + "sslmode=require";
    }

    private static String resolveUsername(ConfigurableEnvironment environment, Map<String, Object> props) {
        return firstNonBlank(
                (String) props.get("PGUSER"),
                environment.getProperty("PGUSER"),
                environment.getProperty("DB_USERNAME"),
                environment.getProperty("POSTGRES_USER"),
                "postgres"
        );
    }

    private static String resolvePassword(ConfigurableEnvironment environment, Map<String, Object> props) {
        return firstNonBlank(
                (String) props.get("PGPASSWORD"),
                environment.getProperty("PGPASSWORD"),
                environment.getProperty("POSTGRES_PASSWORD"),
                environment.getProperty("DB_PASSWORD"),
                ""
        );
    }

    private static String normalizeJdbcUrl(String dbUrl) {
        if (dbUrl.startsWith("jdbc:")) {
            return dbUrl;
        }
        if (dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://")) {
            return toJdbcUrl(dbUrl);
        }
        return dbUrl;
    }

    private static void parseCredentials(String databaseUrl, Map<String, Object> props) {
        try {
            URI uri = URI.create(databaseUrl.replace("postgres://", "postgresql://"));
            if (hasText(uri.getUserInfo())) {
                String[] parts = uri.getUserInfo().split(":", 2);
                props.putIfAbsent("PGUSER", decode(parts[0]));
                if (parts.length > 1) {
                    props.putIfAbsent("PGPASSWORD", decode(parts[1]));
                }
            }
            if (hasText(uri.getPath()) && uri.getPath().length() > 1) {
                props.putIfAbsent("PGDATABASE", uri.getPath().substring(1));
            }
        } catch (Exception ignored) {
            // credenciais virão de PGUSER/PGPASSWORD
        }
    }

    private static String toJdbcUrl(String databaseUrl) {
        if (databaseUrl.startsWith("postgresql://")) {
            return "jdbc:" + databaseUrl;
        }
        if (databaseUrl.startsWith("postgres://")) {
            return "jdbc:postgresql://" + databaseUrl.substring("postgres://".length());
        }
        return databaseUrl;
    }

    private static String decode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (hasText(value)) {
                return value;
            }
        }
        return null;
    }

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
