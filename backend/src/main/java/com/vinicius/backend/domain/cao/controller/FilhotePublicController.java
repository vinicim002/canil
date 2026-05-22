package com.vinicius.backend.domain.cao.controller;

import com.vinicius.backend.domain.cao.dto.FilhoteReservaIntentResponse;
import com.vinicius.backend.domain.cao.dto.FilhoteSolicitarReservaRequest;
import com.vinicius.backend.domain.cao.service.FilhoteDisponibilidadeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/filhotes")
@RequiredArgsConstructor
public class FilhotePublicController {

    private final FilhoteDisponibilidadeService filhoteDisponibilidadeService;

    /**
     * Clique em "Reservar filhote" no site — envia texto + PDF via n8n/Evolution
     * para o telefone informado (funciona no mesmo aparelho conectado à Evolution).
     */
    @PostMapping("/solicitar-reserva")
    public ResponseEntity<FilhoteReservaIntentResponse> solicitarReserva(
            @RequestBody @Valid FilhoteSolicitarReservaRequest request
    ) {
        return ResponseEntity.ok(
                filhoteDisponibilidadeService.solicitarReserva(request.telefone())
        );
    }
}
