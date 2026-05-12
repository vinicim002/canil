package com.vinicius.backend.domain.cliente.model;

import com.vinicius.backend.domain.usuario.model.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "perfis_clientes")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class PerfilCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(unique = true)
    private String cpf;

    private String endereco;
    private String cidade;
    private String estado;
    private String cep;
    private String fotoPerfil;
}