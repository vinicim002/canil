-- Proteção contra agendamento/reserva duplicada (race conditions).
-- Índices parciais: apenas registros "ativos" entram na unicidade.

CREATE UNIQUE INDEX IF NOT EXISTS idx_visita_slot_ativo
    ON visita_agendamentos (data_hora)
    WHERE status NOT IN ('CANCELADO', 'AUSENTE', 'REALIZADO');

CREATE UNIQUE INDEX IF NOT EXISTS idx_reserva_cao_ativa
    ON reservas (cao_id)
    WHERE status NOT IN ('CANCELADA', 'REJEITADA');

CREATE INDEX IF NOT EXISTS idx_reserva_usuario ON reservas (usuario_id);
CREATE INDEX IF NOT EXISTS idx_reserva_status ON reservas (status);
CREATE INDEX IF NOT EXISTS idx_refresh_token_usuario ON refresh_tokens (usuario_id);
CREATE INDEX IF NOT EXISTS idx_agendamento_data_hora ON agendamentos (data_hora);
CREATE INDEX IF NOT EXISTS idx_agendamento_usuario ON agendamentos (usuario_id);

CREATE INDEX IF NOT EXISTS idx_visita_lembrete_pendente
    ON visita_agendamentos (data_hora, lembrete_enviado_em)
    WHERE lembrete_enviado_em IS NULL;
