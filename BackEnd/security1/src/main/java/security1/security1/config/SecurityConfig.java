package security1.security1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // 빈으로 등록
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 된다.
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .requestMatchers("/user/**").authenticated() // 로그인 한 사람들만
                .requestMatchers("/manager/**").access("hasAnyRole('ROLE_MANAGER','ROLE_ADMIN')") // 로그인을 했지만 매니저나 어드민 권한
                .requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')") // 로그인으르 했지만 어드민 권한
                .anyRequest().permitAll() // 이외의 요청은 모든 사람에게 권한 허용
                .and()
                .formLogin()
                .loginPage("/login");

        return http.build();
    }
}