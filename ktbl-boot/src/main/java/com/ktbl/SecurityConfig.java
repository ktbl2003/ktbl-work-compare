//package com.ktbl;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .anyRequest().permitAll() // 允许所有请求无需认证
//                .and()
//                .csrf().disable(); // 禁用CSRF防护
//        return http.build();
//    }
//}
