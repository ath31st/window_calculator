package sidim.doma.wc.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sidim.doma.wc.util.jwt.JwtFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  private final JwtFilter jwtFilter;
  private static final String ADMIN_ROLE = "ADMIN";
  private static final String USER_ROLE = "USER";
  private static final String FRAME_PATH = "/api/v1/frames/**";
  private static final String FRAME_BLOCK_PATH = "/api/v1/frame_blocks/**";
  private static final String BLOCK_TABLE_PATH = "/api/v1/block_tables/**";
  private static final String TABLE_BUTTON_PATH = "/api/v1/table_buttons/**";
  private static final String AUTH_PATH = "/api/v1/auth/**";
  private static final String USER_PATH = "/api/v1/users/**";
  private static final String HEALTH_PATH = "/health";

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.cors(Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(authorize ->
            authorize
                // auth
                .requestMatchers(AUTH_PATH, HEALTH_PATH).permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/v1/auth/logout").authenticated()

                // frames
                .requestMatchers(HttpMethod.GET, FRAME_PATH).hasAnyRole(ADMIN_ROLE, USER_ROLE)
                .requestMatchers(HttpMethod.POST, FRAME_PATH).hasRole(ADMIN_ROLE)
                .requestMatchers(HttpMethod.PUT, FRAME_PATH).hasRole(ADMIN_ROLE)
                .requestMatchers(HttpMethod.DELETE, FRAME_PATH).hasRole(ADMIN_ROLE)

                // frame blocks
                .requestMatchers(FRAME_BLOCK_PATH).hasRole(ADMIN_ROLE)

                // block tables
                .requestMatchers(BLOCK_TABLE_PATH).hasRole(ADMIN_ROLE)

                // table buttons
                .requestMatchers(TABLE_BUTTON_PATH).hasRole(ADMIN_ROLE)

                // users
                .requestMatchers(USER_PATH).hasRole(ADMIN_ROLE)
                .requestMatchers(HttpMethod.PUT, "/api/v1/users/password")
                .hasAnyRole(ADMIN_ROLE, USER_ROLE)

                // default fallback to authenticated users
                .anyRequest().authenticated());

    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
