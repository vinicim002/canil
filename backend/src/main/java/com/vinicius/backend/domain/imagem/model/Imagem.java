package com.vinicius.backend.domain.imagem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.vinicius.backend.domain.cao.model.Cao;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "imagens")
@Setter @Getter @Builder
@NoArgsConstructor @AllArgsConstructor
public class Imagem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy para não carregar o cão inteiro toda vez que buscar a imagem
    @JoinColumn(name = "cao_id", nullable = false)
    @JsonBackReference // Evita o loop infinito no JSON
    private Cao cao;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String publicId; // Crucial para o CloudinaryService

    @Builder.Default
    private Boolean capa = false;

    @Builder.Default
    private Integer ordem = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;
}