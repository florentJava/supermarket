package floflo.api.koss.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {


    @Bean
    public SecurityFilterChain applicationSecuritty(HttpSecurity http) throws Exception{

        
        http
        .cors(cors -> cors.disable())
        .csrf(csrf -> csrf.disable())
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).
        formLogin(login -> login.disable()).
        securityMatcher("/**").
            authorizeHttpRequests(registry -> registry.
            requestMatchers("/hello").permitAll()
            .anyRequest().permitAll()
            // .anyRequest().authenticated()
        );


        return http.build();
    }

    @Bean
	public WebMvcConfigurer corsConfigurer(){

		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry){
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}
}
