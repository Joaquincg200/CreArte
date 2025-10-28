package com.example.CreArte.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/register",
                                "/api/users/login",
                                "/api/products",
                                // Swagger y OpenAPI
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                        .requestMatchers("/api/orders/**",
                                "/api/reviews/product/**",
                                "/api/reviews/user/**").hasAuthority("COMPRADOR")

                        .requestMatchers("/api/products/new",
                                "/api/products/update/**",
                                "/api/products/delete/**",
                                "/api/orders/update/**").hasAuthority("VENDEDOR")

                        .requestMatchers("/api/users").hasAuthority("ADMIN")
                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
