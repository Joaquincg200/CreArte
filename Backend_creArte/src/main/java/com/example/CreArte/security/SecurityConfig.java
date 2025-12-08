package com.example.CreArte.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


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
                                "/webjars/**",
                                "/api/products/new",
                                "/api/reviews/product/**",
                                "/api/reviews/new",
                                "/api/orders/new",
                                "/api/orders/**",
                                "/api/orders/user/**",
                                "/api/orders/update/**",
                                "/api/users/update/**",
                                "/api/users/user/**",
                                "/api/orders/buyer/**",
                                "/api/orders/cancel/**",
                                "/api/chatbot",
                                "/api/products/random",
                                "api/orders/**"
                        ).permitAll()
                        .requestMatchers("/api/**").permitAll()

                        .requestMatchers("/api/orders/**",
                                "/api/reviews/product/**",
                                "/api/reviews/user/**",
                                "/api/product/**").hasAuthority("COMPRADOR")

                        .requestMatchers("/api/products/new",
                                "/api/products/update/**",
                                "/api/products/delete/**",
                                "/api/orders/update/**",
                                "/api/products/user/{idUser}").hasAuthority("VENDEDOR")

                        .requestMatchers("/api/users").hasAuthority("ADMIN")

                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
