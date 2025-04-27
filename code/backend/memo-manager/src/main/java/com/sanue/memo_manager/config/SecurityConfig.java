package com.sanue.memo_manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/h2-console/**", "/api/**").permitAll() // 允许访问 H2 Console、 /api/memos
                    .anyRequest().authenticated())
            .csrf(csrf -> csrf.disable()) // 禁用 CSRF
            .headers(headers -> headers.frameOptions().disable()); // 允许嵌套框架

    return http.build();
}
    

    
}