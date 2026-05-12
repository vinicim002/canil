package com.vinicius.backend.domain.pagamento.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vinicius.backend.domain.pagamento.enums.MetodoPagamento;
import com.vinicius.backend.domain.pagamento.enums.StatusPagamento;
import com.vinicius.backend.domain.pagamento.enums.TipoPagamento;
import com.vinicius.backend.domain.reserva.model.Reserva;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "pagamentos")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserva_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Reserva reserva;

    @Column(nullable = false)
    @Builder.Default
    private BigDecimal valor = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StatusPagamento status = StatusPagamento.PENDENTE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPagamento tipo;

    private String transacaoId; // ID que vem do Stripe/Mercado Pago
    private String gateway;     // Ex: "MERCADO_PAGO"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MetodoPagamento metodo;

    private LocalDateTime pagoEm;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;

    /**
     * Helper para confirmar o pagamento via Webhook
     */
    public void confirmarPagamento() {
        this.status = StatusPagamento.APROVADO;
        this.pagoEm = LocalDateTime.now();
    }
}