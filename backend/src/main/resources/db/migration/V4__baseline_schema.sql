-- Schema principal (tabelas além de visita_agendamentos e bloqueio_horarios).
-- Idempotente: seguro em bancos já criados pelo Hibernate em dev.

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(50),
    role VARCHAR(30) NOT NULL,
    ativo BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) NOT NULL,
    criado_em TIMESTAMP,
    atualizado_em TIMESTAMP
);

CREATE TABLE IF NOT EXISTS perfis_clientes (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL UNIQUE,
    cpf VARCHAR(20) UNIQUE,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(20),
    foto_perfil VARCHAR(500),
    CONSTRAINT fk_perfil_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    token VARCHAR(512) NOT NULL UNIQUE,
    expiracao TIMESTAMP NOT NULL,
    revogado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP,
    CONSTRAINT fk_refresh_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS caes (
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    raca VARCHAR(50),
    tamanho VARCHAR(50),
    tipo_pelo VARCHAR(50),
    genero VARCHAR(50),
    descricao TEXT,
    preco NUMERIC(19, 2),
    status VARCHAR(50),
    data_nascimento DATE,
    cor VARCHAR(50),
    microchip VARCHAR(100),
    pedigree VARCHAR(500),
    destaque BOOLEAN DEFAULT FALSE,
    tipo VARCHAR(50) NOT NULL,
    pai_id UUID,
    mae_id UUID,
    criado_em TIMESTAMP,
    atualizado_em TIMESTAMP
);

DO $$
BEGIN
    ALTER TABLE caes ADD CONSTRAINT fk_caes_pai FOREIGN KEY (pai_id) REFERENCES caes (id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE caes ADD CONSTRAINT fk_caes_mae FOREIGN KEY (mae_id) REFERENCES caes (id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS imagens (
    id UUID PRIMARY KEY,
    cao_id UUID NOT NULL,
    url VARCHAR(1000) NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    capa BOOLEAN DEFAULT FALSE,
    ordem INTEGER DEFAULT 0,
    criado_em TIMESTAMP,
    CONSTRAINT fk_imagem_cao FOREIGN KEY (cao_id) REFERENCES caes (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS historico_vacinacao (
    id UUID PRIMARY KEY,
    cao_id UUID NOT NULL,
    nome_vacina VARCHAR(255) NOT NULL,
    data_aplicacao DATE NOT NULL,
    proxima_dose DATE,
    lote VARCHAR(100),
    veterinario VARCHAR(255),
    observacoes TEXT,
    criado_em TIMESTAMP,
    CONSTRAINT fk_vacinacao_cao FOREIGN KEY (cao_id) REFERENCES caes (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservas (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    cao_id UUID NOT NULL,
    status VARCHAR(30) NOT NULL,
    valor_sinal NUMERIC(19, 2) NOT NULL DEFAULT 0,
    valor_total NUMERIC(19, 2) NOT NULL DEFAULT 0,
    observacoes TEXT,
    data_autorizacao TIMESTAMP,
    autorizado_por VARCHAR(255),
    criado_em TIMESTAMP,
    atualizado_em TIMESTAMP,
    CONSTRAINT fk_reserva_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    CONSTRAINT fk_reserva_cao FOREIGN KEY (cao_id) REFERENCES caes (id)
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    cao_id UUID,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(30) NOT NULL,
    observacoes TEXT,
    criado_em TIMESTAMP,
    atualizado_em TIMESTAMP,
    CONSTRAINT fk_agendamento_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    CONSTRAINT fk_agendamento_cao FOREIGN KEY (cao_id) REFERENCES caes (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS pagamentos (
    id UUID PRIMARY KEY,
    reserva_id UUID NOT NULL,
    valor NUMERIC(19, 2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    transacao_id VARCHAR(255),
    gateway VARCHAR(100),
    metodo VARCHAR(30) NOT NULL,
    pago_em TIMESTAMP,
    criado_em TIMESTAMP,
    CONSTRAINT fk_pagamento_reserva FOREIGN KEY (reserva_id) REFERENCES reservas (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS depoimentos (
    id UUID PRIMARY KEY,
    usuario_id UUID,
    nome_cliente VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    nota INTEGER NOT NULL,
    foto_url VARCHAR(1000),
    aprovado BOOLEAN DEFAULT FALSE,
    destaque BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP,
    CONSTRAINT fk_depoimento_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY,
    pergunta VARCHAR(500) NOT NULL,
    resposta TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    categoria INTEGER,
    criado_em TIMESTAMP,
    atualizado_em TIMESTAMP
);
