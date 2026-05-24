package com.vinicius.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.mock.env.MockEnvironment;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class RailwayDatabaseEnvironmentPostProcessorTest {

    @Test
    void converteDatabaseUrlRailwayParaJdbcComSsl() {
        MockEnvironment env = new MockEnvironment();
        env.setProperty("DATABASE_URL", "postgresql://postgres:secret@roundhouse.proxy.rlwy.net:12345/railway");

        Map<String, Object> props = new HashMap<>();
        String url = RailwayDatabaseEnvironmentPostProcessor.resolveDbUrl(env, props);

        assertThat(url).isEqualTo("jdbc:postgresql://postgres:secret@roundhouse.proxy.rlwy.net:12345/railway?sslmode=require");
        assertThat(props.get("PGUSER")).isEqualTo("postgres");
        assertThat(props.get("PGPASSWORD")).isEqualTo("secret");
    }

    @Test
    void montaUrlAPartirDePgHostSemSslInterno() {
        MockEnvironment env = new MockEnvironment();
        env.setProperty("PGHOST", "postgres.railway.internal");
        env.setProperty("PGPORT", "5432");
        env.setProperty("PGDATABASE", "railway");

        Map<String, Object> props = new HashMap<>();
        String url = RailwayDatabaseEnvironmentPostProcessor.resolveDbUrl(env, props);

        assertThat(url).isEqualTo("jdbc:postgresql://postgres.railway.internal:5432/railway");
    }

    @Test
    void respeitaDbUrlManualComJdbc() {
        MockEnvironment env = new MockEnvironment();
        env.setProperty("DB_URL", "jdbc:postgresql://localhost:5432/canil_db");

        Map<String, Object> props = new HashMap<>();
        String url = RailwayDatabaseEnvironmentPostProcessor.resolveDbUrl(env, props);

        assertThat(url).isEqualTo("jdbc:postgresql://localhost:5432/canil_db");
    }

    @Test
    void normalizaSpringDatasourceUrlPostgresqlSemJdbcPrefix() {
        MockEnvironment env = new MockEnvironment();
        env.setProperty(
                "spring.datasource.url",
                "postgresql://postgres:secret@postgres.railway.internal:5432/railway"
        );

        new RailwayDatabaseEnvironmentPostProcessor().postProcessEnvironment(env, new SpringApplication());

        assertThat(env.getProperty("spring.datasource.url"))
                .isEqualTo("jdbc:postgresql://postgres:secret@postgres.railway.internal:5432/railway");
        assertThat(env.getProperty("spring.datasource.username")).isEqualTo("postgres");
        assertThat(env.getProperty("spring.datasource.password")).isEqualTo("secret");
    }
}
