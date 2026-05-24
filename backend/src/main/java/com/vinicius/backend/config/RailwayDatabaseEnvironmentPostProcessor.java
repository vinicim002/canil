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
 * Converte DATABASE_URL do Railway (postgresql://...) em propriedades JDBC
 * quando DB_URL não foi definida manualmente.
 */
public class RailwayDatabaseEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final String SOURCE = "railwayDatabase";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        if (hasText(environment.getProperty("DB_URL"))) {
            return;
        }

        String databaseUrl = environment.getProperty("DATABASE_URL");
        if (!hasText(databaseUrl)) {
            return;
        }

        Map<String, Object> props = new HashMap<>();

        if (databaseUrl.startsWith("jdbc:")) {
            props.put("DB_URL", databaseUrl);
        } else {
            props.put("DB_URL", toJdbcUrl(databaseUrl));
            parseCredentials(databaseUrl, props);
        }

        environment.getPropertySources().addFirst(new MapPropertySource(SOURCE, props));
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
            // JDBC URL já montada; credenciais vêm de PGUSER/PGPASSWORD
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

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
