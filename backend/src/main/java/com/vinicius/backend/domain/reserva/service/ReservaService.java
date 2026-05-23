package com.vinicius.backend.domain.reserva.service;

import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.cao.service.CaoService;
import com.vinicius.backend.domain.reserva.dto.ReservaRequest;
import com.vinicius.backend.domain.reserva.dto.ReservaResponse;
import com.vinicius.backend.domain.reserva.enums.StatusReserva;
import com.vinicius.backend.domain.reserva.mapper.ReservaMapper;
import com.vinicius.backend.domain.reserva.model.Reserva;
import com.vinicius.backend.domain.reserva.repository.ReservaRepository;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final ReservaMapper reservaMapper;
    private final CaoService caoService;
    private final UsuarioService usuarioService;

    @Transactional
    public ReservaResponse criar(UUID usuarioId, ReservaRequest request) {
        Cao cao = caoService.buscarEntidadePorId(request.caoId());

        if (cao.getStatus() != StatusCao.DISPONIVEL) {
            throw new BusinessException("Este cão não está disponível para reserva.");
        }

        // Verifica se já existe reserva que não foi cancelada nem rejeitada
        if (reservaRepository.existsByCaoIdAndStatusNotIn(request.caoId(),
                List.of(StatusReserva.CANCELADA, StatusReserva.REJEITADA))) {
            throw new BusinessException("Este cão já possui uma solicitação ativa.");
        }

        Usuario usuario = usuarioService.buscarEntidadePorId(usuarioId);
        usuarioService.verificarClienteAprovado(usuario);

        Reserva reserva = Reserva.builder()
                .usuario(usuario)
                .cao(cao)
                .status(StatusReserva.SOLICITADA) // Começa como solicitada
                .valorSinal(request.valorSinal())
                .valorTotal(request.valorTotal())
                .observacoes(request.observacoes())
                .build();

        // No seu fluxo, talvez queira manter DISPONIVEL até ser APROVADA,
        // ou colocar um status INTERMEDIARIO. Aqui mantive reservado para garantir.
        caoService.atualizarStatus(cao.getId(), StatusCao.RESERVADO);

        return reservaMapper.toResponse(reservaRepository.save(reserva));
    }

    @Transactional
    public ReservaResponse aprovar(UUID id) {
        Reserva reserva = buscarEntidadePorId(id);

        if (reserva.getStatus() != StatusReserva.SOLICITADA && reserva.getStatus() != StatusReserva.EM_ANALISE) {
            throw new BusinessException("Apenas reservas solicitadas ou em análise podem ser aprovadas.");
        }

        reserva.setStatus(StatusReserva.APROVADA);
        return reservaMapper.toResponse(reservaRepository.save(reserva));
    }

    @Transactional
    public ReservaResponse pagar(UUID id) {
        Reserva reserva = buscarEntidadePorId(id);

        if (reserva.getStatus() != StatusReserva.APROVADA) {
            throw new BusinessException("Apenas reservas aprovadas podem ser marcadas como pagas.");
        }

        reserva.setStatus(StatusReserva.PAGA);
        caoService.atualizarStatus(reserva.getCao().getId(), StatusCao.VENDIDO);

        return reservaMapper.toResponse(reservaRepository.save(reserva));
    }

    @Transactional
    public ReservaResponse rejeitar(UUID id) {
        Reserva reserva = buscarEntidadePorId(id);

        reserva.setStatus(StatusReserva.REJEITADA);
        // Se rejeitar, o cão volta a ficar disponível para outros
        caoService.atualizarStatus(reserva.getCao().getId(), StatusCao.DISPONIVEL);

        return reservaMapper.toResponse(reservaRepository.save(reserva));
    }

    @Transactional
    public ReservaResponse cancelar(UUID id, UUID usuarioId, boolean isAdmin) {
        Reserva reserva = buscarEntidadePorId(id);
        verificarAcesso(reserva, usuarioId, isAdmin);

        if (reserva.getStatus() == StatusReserva.PAGA) {
            throw new BusinessException("Reservas pagas não podem ser canceladas por este método.");
        }

        reserva.setStatus(StatusReserva.CANCELADA);
        caoService.atualizarStatus(reserva.getCao().getId(), StatusCao.DISPONIVEL);

        return reservaMapper.toResponse(reservaRepository.save(reserva));
    }

    @Transactional
    public ReservaResponse colocarEmAnalise(UUID id) {
        Reserva reserva = buscarEntidadePorId(id);
        reserva.setStatus(StatusReserva.EM_ANALISE);
        return reservaMapper.toResponse(reservaRepository.save(reserva));
    }

    // Métodos de listagem e busca permanecem os mesmos...
    public Reserva buscarEntidadePorId(UUID id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva não encontrada."));
    }

    @Transactional(readOnly = true)
    public List<ReservaResponse> listarTodas() {
        return reservaRepository.findAll()
                .stream()
                .map(reservaMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReservaResponse> listarPorUsuario(UUID usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(reservaMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReservaResponse> listarPorStatus(StatusReserva status) {
        return reservaRepository.findByStatus(status)
                .stream()
                .map(reservaMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReservaResponse buscarPorId(UUID id, UUID usuarioId, boolean isAdmin) {
        Reserva reserva = buscarEntidadePorId(id);
        verificarAcesso(reserva, usuarioId, isAdmin);
        return reservaMapper.toResponse(reserva);
    }

    private void verificarAcesso(Reserva reserva, UUID usuarioId, boolean isAdmin) {
        if (!isAdmin && !reserva.getUsuario().getId().equals(usuarioId)) {
            throw new AccessDeniedException("Acesso negado a esta reserva.");
        }
    }
}