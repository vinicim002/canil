package com.vinicius.backend.domain.visita.model;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "visita_agendamentos",
        indexes = {
                @Index(name = "idx_visita_token", columnList = "token_acesso", unique = true),
                @Index(name = "idx_visita_data_hora", columnList = "data_hora"),
                @Index(name = "idx_visita_telefone", columnList = "telefone")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitaAgendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, length = 20)
    private String telefone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StatusAgendamento status = StatusAgendamento.PENDENTE;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Column(name = "token_acesso", nullable = false, unique = true, length = 64)
    private String tokenAcesso;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    private LocalDateTime atualizadoEm;
}
