package com.vinicius.backend.domain.pagamento.service;

import com.vinicius.backend.domain.pagamento.dto.PagamentoRequest;
import com.vinicius.backend.domain.pagamento.dto.PagamentoResponse;
import com.vinicius.backend.domain.pagamento.enums.StatusPagamento;
import com.vinicius.backend.domain.pagamento.enums.TipoPagamento;
import com.vinicius.backend.domain.pagamento.mapper.PagamentoMapper;
import com.vinicius.backend.domain.pagamento.model.Pagamento;
import com.vinicius.backend.domain.pagamento.repository.PagamentoRepository;
import com.vinicius.backend.domain.reserva.enums.StatusReserva;
import com.vinicius.backend.domain.reserva.model.Reserva;
import com.vinicius.backend.domain.reserva.service.ReservaService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PagamentoService {

    private final PagamentoRepository pagamentoRepository;
    private final PagamentoMapper pagamentoMapper;
    private final ReservaService reservaService;

    @Transactional
    public PagamentoResponse criar(PagamentoRequest request) {
        Reserva reserva = reservaService.buscarEntidadePorId(request.reservaId());

        if (reserva.getStatus() == StatusReserva.CANCELADA) {
            throw new BusinessException("Não é possível registrar pagamento para uma reserva cancelada.");
        }

        if (reserva.getStatus() == StatusReserva.PAGA) {
            throw new BusinessException("Esta reserva já foi concluída.");
        }

        if (request.tipo() == TipoPagamento.SINAL &&
                pagamentoRepository.existsByReservaIdAndTipo(request.reservaId(), TipoPagamento.SINAL)) {
            throw new BusinessException("Sinal já registrado para esta reserva.");
        }

        Pagamento pagamento = Pagamento.builder()
                .reserva(reserva)
                .valor(request.valor())
                .status(StatusPagamento.PENDENTE)
                .tipo(request.tipo())
                .metodo(request.metodo())
                .build();

        return pagamentoMapper.toResponse(pagamentoRepository.save(pagamento));
    }

    @Transactional
    public PagamentoResponse aprovar(UUID id) {
        Pagamento pagamento = buscarEntidadePorId(id);

        if (pagamento.getStatus() != StatusPagamento.PENDENTE) {
            throw new BusinessException("Apenas pagamentos pendentes podem ser aprovados.");
        }

        pagamento.setStatus(StatusPagamento.APROVADO);
        pagamento.setPagoEm(LocalDateTime.now());
        pagamento.setTransacaoId(UUID.randomUUID().toString());
        pagamento.setGateway("MANUAL");

        Reserva reserva = pagamento.getReserva();
        if (pagamento.getTipo() == TipoPagamento.SINAL &&
                reserva.getStatus() == StatusReserva.APROVADA) {
            reservaService.pagar(reserva.getId());
        }

        return pagamentoMapper.toResponse(pagamentoRepository.save(pagamento));
    }

    @Transactional
    public PagamentoResponse recusar(UUID id) {
        Pagamento pagamento = buscarEntidadePorId(id);

        if (pagamento.getStatus() != StatusPagamento.PENDENTE) {
            throw new BusinessException("Apenas pagamentos pendentes podem ser recusados.");
        }

        pagamento.setStatus(StatusPagamento.RECUSADO);
        return pagamentoMapper.toResponse(pagamentoRepository.save(pagamento));
    }

    @Transactional
    public PagamentoResponse estornar(UUID id) {
        Pagamento pagamento = buscarEntidadePorId(id);

        if (pagamento.getStatus() != StatusPagamento.APROVADO) {
            throw new BusinessException("Apenas pagamentos aprovados podem ser estornados.");
        }

        pagamento.setStatus(StatusPagamento.ESTORNADO);
        return pagamentoMapper.toResponse(pagamentoRepository.save(pagamento));
    }

    @Transactional(readOnly = true)
    public List<PagamentoResponse> listarPorReserva(UUID reservaId, UUID usuarioId, boolean isAdmin) {
        Reserva reserva = reservaService.buscarEntidadePorId(reservaId);
        if (!isAdmin && !reserva.getUsuario().getId().equals(usuarioId)) {
            throw new AccessDeniedException("Acesso negado aos pagamentos desta reserva.");
        }
        return pagamentoRepository.findByReservaId(reservaId)
                .stream()
                .map(pagamentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PagamentoResponse> listarPorStatus(StatusPagamento status) {
        return pagamentoRepository.findByStatus(status)
                .stream()
                .map(pagamentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PagamentoResponse buscarPorId(UUID id) {
        return pagamentoMapper.toResponse(buscarEntidadePorId(id));
    }

    public Pagamento buscarEntidadePorId(UUID id) {
        return pagamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pagamento não encontrado."));
    }
}