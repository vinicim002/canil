package com.vinicius.backend.domain.visita.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(
        name = "bloqueio_horarios",
        indexes = @Index(name = "idx_bloqueio_data", columnList = "data")
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BloqueioHorario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private LocalDate data;

    /** Null = dia inteiro bloqueado. */
    @Column
    private LocalTime hora;

    @Column(length = 500)
    private String motivo;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;
}
