package com.vinicius.backend.support;

import com.vinicius.backend.infrastructure.n8n.VisitaNotificacaoService;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.testcontainers.containers.PostgreSQLContainer;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public abstract class IntegrationTestBase {

    protected static final PostgreSQLContainer<?> POSTGRES;

    static {
        POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine")
                .withDatabaseName("canil_test")
                .withUsername("test")
                .withPassword("test");
        POSTGRES.start();
    }

    @MockitoBean
    VisitaNotificacaoService visitaNotificacaoService;

    @DynamicPropertySource
    static void datasourceProps(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("app.n8n.webhook-secret", () -> "test-n8n-webhook-secret");
        registry.add("app.n8n.enabled", () -> "true");
        registry.add("app.n8n.visita-whatsapp-via-evolution-direto", () -> "false");
    }
}
