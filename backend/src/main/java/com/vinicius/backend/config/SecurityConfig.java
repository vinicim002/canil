package com.vinicius.backend.config;

import com.vinicius.backend.security.JwtAuthFilter;
import com.vinicius.backend.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
                // Desabilita CSRF (apropriado para APIs JWT)
                .csrf(AbstractHttpConfigurer::disable)

                // Habilita CORS com configurações dinâmicas
                .cors(Customizer.withDefaults())

                // Gerenciamento de sessão stateless (apropriado para JWT)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Configuração de autorização por endpoint
                .authorizeHttpRequests(auth -> auth
                        // Endpoints públicos de autenticação
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/refresh").permitAll()

                        // Endpoint de criação de novo usuário (público - considere remover se não desejado)
                        .requestMatchers("POST", "/api/usuarios").permitAll()

                        // Endpoints públicos de leitura (GET) para cães
                        // Descomente se quiser que a listagem de cães seja pública:
                        // .requestMatchers("GET", "/api/caes/**").permitAll()

                        // Health check e info endpoints (se existirem)
                        .requestMatchers("/api/health").permitAll()
                        .requestMatchers("/api/info").permitAll()
                        .requestMatchers(
                                "/v3/api-docs/**",          // Documentação em JSON/YAML
                                "/v3/api-docs.yaml",        // Documentação em YAML específica
                                "/swagger-ui/**",           // Recursos da interface (JS, CSS, Imagens)
                                "/swagger-ui.html",         // Página principal da interface
                                "/swagger-resources/**",    // Recursos adicionais se houver
                                "/webjars/**"               // Bibliotecas web externas
                        ).permitAll()

                        // Qualquer outra requisição precisa estar autenticada
                        .anyRequest().authenticated()
                )

                // Define o provider de autenticação
                .authenticationProvider(authenticationProvider())

                // Adiciona o filtro JWT antes do filtro padrão de autenticação
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
        // Exemplo: http://localhost:3000,https://seu-dominio.com
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        configuration.setAllowedOrigins(origins);

        // Métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Headers permitidos (Authorization é obrigatório para JWT)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With"));

        // Headers expostos ao cliente (se precisar retornar headers customizados)
        configuration.setExposedHeaders(Arrays.asList("Authorization", "X-Total-Count"));

        // Permite credenciais (necessário para JWT no header Authorization)
        configuration.setAllowCredentials(true);

        // Tempo máximo de cache da preflight request (em segundos)
        configuration.setMaxAge(corsMaxAge);

        // Registra a configuração para todos os endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /**
     * Provider de autenticação com DAO
     * Usa UserDetailsServiceImpl para carregar dados do usuário
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        // Oculta se o usuário existe ou não (melhora segurança)
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
     * Nível de força padrão (10) é adequado para a maioria dos casos
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}