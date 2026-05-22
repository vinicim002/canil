ALTER TABLE visita_agendamentos
    ADD COLUMN IF NOT EXISTS lembrete_enviado_em TIMESTAMP;
