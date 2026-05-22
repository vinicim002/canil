-- Migração de referência (Flyway desabilitado em dev; Hibernate ddl-auto cria/atualiza a tabela).
CREATE TABLE IF NOT EXISTS visita_agendamentos (
    id UUID PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(30) NOT NULL,
    observacoes TEXT,
    token_acesso VARCHAR(64) NOT NULL UNIQUE,
    criado_em TIMESTAMP,
    atualizado_em TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visita_data_hora ON visita_agendamentos (data_hora);
CREATE INDEX IF NOT EXISTS idx_visita_telefone ON visita_agendamentos (telefone);
