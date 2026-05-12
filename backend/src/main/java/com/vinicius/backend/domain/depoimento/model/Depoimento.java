package com.vinicius.backend.domain.depoimento.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vinicius.backend.domain.usuario.model.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "depoimentos")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Depoimento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private Integer nota; // 1 a 5

    private String fotoUrl;

    @Builder.Default
    private Boolean aprovado = false;

    @Builder.Default
    private Boolean destaque = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;
}