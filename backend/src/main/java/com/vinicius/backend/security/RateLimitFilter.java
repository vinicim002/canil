package com.vinicius.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vinicius.backend.config.RateLimitProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimitProperties rateLimitProperties;
    private final Map<String, Window> windows = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if (!rateLimitProperties.isEnabled()) {
            return true;
        }
        String path = request.getRequestURI();
        return !path.startsWith("/api/public/")
                && !path.equals("/api/contato")
                && !path.equals("/api/auth/login")
                && !path.startsWith("/api/webhooks/n8n/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String key = resolveClientIp(request) + ":" + request.getRequestURI();
        int limit = rateLimitProperties.getRequestsPerMinute();

        if (!tryAcquire(key, limit)) {
            responderLimiteExcedido(response);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void responderLimiteExcedido(HttpServletResponse response) throws IOException {
        response.setStatus(429);
        response.setContentType("application/json");
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", 429);
        body.put("mensagem", "Muitas requisições. Aguarde um momento e tente novamente.");
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }

    private boolean tryAcquire(String key, int limit) {
        long now = System.currentTimeMillis();
        Window window = windows.compute(key, (k, current) -> {
            if (current == null || now - current.startMs >= 60_000) {
                return new Window(now, new AtomicInteger(0));
            }
            return current;
        });

        return window.count.incrementAndGet() <= limit;
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private record Window(long startMs, AtomicInteger count) {}
}
