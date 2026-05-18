package com.vinicius.backend.config;

import com.vinicius.backend.security.JwtAuthFilter;
import com.vinicius.backend.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsServiceImpl userDetailsService;

    // Injetar as origens CORS do application.properties
    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    // Injetar o tempo máximo de cache do CORS (em segundos)
    @Value("${app.cors.max-age:3600}")
    private long corsMaxAge;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // 1. ENDPOINTS DE AUTENTICAÇÃO (PÚBLICOS)
                        .requestMatchers("/api/auth/**").permitAll()

                        // 2. DOCUMENTAÇÃO E MONITORAMENTO (PÚBLICOS)
                        .requestMatchers("/api/health", "/api/info").permitAll()
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                        // 3. REGRAS DE NEGÓCIO ESPECÍFICAS
                        // Cadastro de usuário
                        .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()

                        // Cães: Leitura pública, Escrita autenticada
                        .requestMatchers(HttpMethod.GET, "/api/caes/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/caes/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/caes/**").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/caes/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/caes/**").authenticated()

                        // FAQ: Leitura pública, Escrita/Modificação autenticada
                        .requestMatchers(HttpMethod.GET, "/api/faq/**").permitAll() // ✅ FAQ Público liberado!
                        .requestMatchers(HttpMethod.POST, "/api/faq/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/faq/**").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/faq/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/faq/**").authenticated()

                        // 4. REGRA GERAL (SEMPRE POR ÚLTIMO)
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuração dinâmica de CORS baseada em propriedades
     * Permite múltiplas origens e define headers/métodos permitidos
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Origens permitidas (lidas do application.properties)
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        configuration.setAllowedOrigins(origins);

        // Métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Headers permitidos (Authorization é obrigatório para JWT)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With"));

        // Headers expostos ao cliente
        configuration.setExposedHeaders(Arrays.asList("Authorization", "X-Total-Count"));

        // Permite credenciais
        configuration.setAllowCredentials(true);

        // Tempo máximo de cache da preflight request
        configuration.setMaxAge(corsMaxAge);

        // Registra a configuração para todos os endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /**
     * Provider de autenticação com DAO
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        provider.setHideUserNotFoundExceptions(true);
        return provider;
    }

    /**
     * AuthenticationManager para processar autenticações
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Encoder de senha com BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}