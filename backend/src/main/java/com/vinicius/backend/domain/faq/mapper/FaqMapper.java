package com.vinicius.backend.domain.faq.mapper;

import com.vinicius.backend.domain.faq.dto.FaqResponse;
import com.vinicius.backend.domain.faq.model.Faq;
import org.springframework.stereotype.Component;

@Component
public class FaqMapper {

    public FaqResponse toResponse(Faq faq) {
        return new FaqResponse(
                faq.getId(),
                faq.getPergunta(),
                faq.getResposta(),
                faq.getOrdem(),
                faq.getAtivo()
        );
    }
}