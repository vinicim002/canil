package com.vinicius.backend.domain.reserva.enums;

public enum StatusReserva {
    SOLICITADA,    // O cliente clicou mas o dono ainda não viu/conversou
    EM_ANALISE,    // O dono está conversando com o cliente
    APROVADA,      // O dono escolheu este cliente (libera o pagamento)
    REJEITADA,     // O dono escolheu outro para este animal
    PAGA,          // Reserva definitiva concluída
    CANCELADA      // Cliente desistiu
}
