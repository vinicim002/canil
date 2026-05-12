package com.vinicius.backend.domain.reserva.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.reserva.enums.StatusReserva;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reservas")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cao_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cao cao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StatusReserva status = StatusReserva.SOLICITADA;

    @Builder.Default
    @Column(nullable = false)
    private BigDecimal valorSinal = BigDecimal.ZERO;

    @Builder.Default
    @Column(nullable = false)
    private BigDecimal valorTotal = BigDecimal.ZERO;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    // Campos de Curadoria (Rastreabilidade)
    private LocalDateTime dataAutorizacao;
    private String autorizadoPor; // Nome ou ID do Admin que aprovou a conversa

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    private LocalDateTime atualizadoEm;

    /**
     * Helper method para autorizar a reserva
     */
    public void autorizar(String nomeAdmin) {
        this.status = StatusReserva.APROVADA;
        this.dataAutorizacao = LocalDateTime.now();
        this.autorizadoPor = nomeAdmin;
    }
}