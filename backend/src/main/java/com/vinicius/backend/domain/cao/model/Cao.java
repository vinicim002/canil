package com.vinicius.backend.domain.cao.model;

import com.vinicius.backend.domain.cao.enums.*;
import com.vinicius.backend.domain.imagem.model.Imagem;
import com.vinicius.backend.domain.vacinacao.model.HistoricoVacinacao;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "caes") // Alterei para 'caes' (plural mais comum)
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class Cao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    private Raca raca;

    @Enumerated(EnumType.STRING)
    private Tamanho tamanho;

    @Enumerated(EnumType.STRING)
    private TipoPelo tipoPelo;

    @Enumerated(EnumType.STRING)
    private Genero genero;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    private StatusCao status;

    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    private Cor cor;

    private String microchip; // Identificação única do animal

    private String pedigree; // Link para PDF ou número do registro

    private Boolean destaque = false;

    // Árvore Genealógica
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pai_id")
    private Cao pai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mae_id")
    private Cao mae;

    @OneToMany(mappedBy = "cao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagem> imagens = new ArrayList<>();

    @OneToMany(mappedBy = "cao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HistoricoVacinacao> vacinacoes = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    private LocalDateTime atualizadoEm;
}