package com.vinicius.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.visita")
public class VisitaProperties {

    private String siteUrl = "http://localhost:5173";
    private String managementPath = "/agendamento";
    private LocalTime horaInicio = LocalTime.of(9, 0);
    private LocalTime horaFim = LocalTime.of(17, 0);
    private int duracaoMinutos = 60;
    private int antecedenciaMinimaHoras = 24;
    private int diasAntecedenciaMaxima = 60;
    /** 1=Segunda … 7=Domingo (ISO). Domingo bloqueado por padrão. */
    private String diasPermitidos = "1,2,3,4,5,6";
}
