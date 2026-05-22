CREATE TABLE IF NOT EXISTS bloqueio_horarios (
    id UUID PRIMARY KEY,
    data DATE NOT NULL,
    hora TIME,
    motivo VARCHAR(500),
    criado_em TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bloqueio_data ON bloqueio_horarios (data);
