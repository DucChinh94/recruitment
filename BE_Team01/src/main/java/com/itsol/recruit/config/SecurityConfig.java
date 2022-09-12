package com.itsol.recruit.config;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.security.jwt.JWTConfigurer;
import com.itsol.recruit.security.jwt.TokenProvider;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    CorsFilter corsFilter;

    TokenProvider tokenProvider;

    public SecurityConfig(CorsFilter corsFilter, TokenProvider tokenProvider) {
        this.corsFilter = corsFilter;
        this.tokenProvider = tokenProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/swagger-resources/**", "/v2/api-docs").permitAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
//                .antMatchers("/api/authenticate").permitAll()
//                .antMatchers(Constants.Api.Path.AUTH+ "/**").permitAll()
                .antMatchers("/api/logout").permitAll()
                .antMatchers("/api/register").permitAll()
                .antMatchers("/api/admin/**").hasAnyRole(Constants.Role.ADMIN)
                .antMatchers("/api/je/**").hasAnyRole(Constants.Role.JE, Constants.Role.ADMIN)
                .antMatchers("/api/user/**").hasAnyRole(Constants.Role.JE, Constants.Role.ADMIN,Constants.Role.USER)
                .antMatchers("/api/public/**").permitAll()

                .antMatchers("/api/**").permitAll()
                .and()
                .httpBasic()
                .and()
                .apply(securityConfigurerAdapter())
                .and()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .accessDeniedPage("/403");
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }

}
