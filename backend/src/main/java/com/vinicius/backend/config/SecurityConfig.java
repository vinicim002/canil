package com.vinicius.backend.config;

import com.vinicius.backend.security.JwtAuthFilter;
import com.vinicius.backend.security.RateLimitFilter;
import com.vinicius.backend.security.RestAccessDeniedHandler;
import com.vinicius.backend.security.RestAuthenticationEntryPoint;
import com.vinicius.backend.security.SecurityHeadersConfigurer;
import com.vinicius.backend.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
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
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
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
    private final RateLimitFilter rateLimitFilter;
    private final UserDetailsServiceImpl userDetailsService;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;
    private final Environment environment;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${app.cors.max-age:3600}")
    private long corsMaxAge;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .headers(headers -> SecurityHeadersConfigurer.apply(headers, environment))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/login")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/refresh")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/register")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/forgot-password")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/reset-password")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/me")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/contato", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/health")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/info")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/v3/api-docs/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/v3/api-docs.yaml")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/swagger-ui/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/swagger-ui.html")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/swagger-resources/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/webjars/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/usuarios", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/caes/**", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/faq/**", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/public/visitas/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/public/filhotes/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/webhooks/n8n/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/docs/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/caes/**", "POST")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/caes/**", "PUT")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/caes/**", "PATCH")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/caes/**", "DELETE")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/faq/**", "POST")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/faq/**", "PUT")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/faq/**", "PATCH")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/faq/**", "DELETE")).authenticated()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        configuration.setAllowedOrigins(origins);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "X-Total-Count"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(corsMaxAge);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        provider.setHideUserNotFoundExceptions(true);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
