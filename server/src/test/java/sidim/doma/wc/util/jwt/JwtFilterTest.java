package sidim.doma.wc.util.jwt;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.servlet.HandlerExceptionResolver;
import sidim.doma.wc.service.CustomUserDetailsService;

@ExtendWith(MockitoExtension.class)
class JwtFilterTest {

  @Mock
  private CustomUserDetailsService customUserDetailsService;

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private HandlerExceptionResolver resolver;

  @Mock
  private HttpServletRequest request;

  @Mock
  private HttpServletResponse response;

  @Mock
  private FilterChain filterChain;

  @Mock
  private UserDetails userDetails;

  @InjectMocks
  private JwtFilter jwtFilter;

  private final String email = "test@test";
  private final String authHeader = "Bearer testToken";
  private final String jwt = "testToken";

  @Test
  void shouldDoFilterInternal() throws ServletException, IOException {

    val authToken = new UsernamePasswordAuthenticationToken(
        email,
        userDetails.getPassword(),
        userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authToken);


    when(request.getHeader("Authorization")).thenReturn(authHeader);
    when(jwtUtil.validateAccessTokenAndRetrieveSubject(jwt)).thenReturn(email);
    when(customUserDetailsService.loadUserByUsername(anyString())).thenReturn(userDetails);

    jwtFilter.doFilterInternal(request, response, filterChain);

    verify(jwtUtil, times(1)).validateAccessTokenAndRetrieveSubject(jwt);
    verify(customUserDetailsService, times(1)).loadUserByUsername(email);
    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void shouldDoFilterInternalWithEmptySecurityContextHolder() throws ServletException, IOException {
    when(request.getHeader("Authorization")).thenReturn(authHeader);
    when(jwtUtil.validateAccessTokenAndRetrieveSubject(jwt)).thenReturn(email);
    when(customUserDetailsService.loadUserByUsername(anyString())).thenReturn(userDetails);

    jwtFilter.doFilterInternal(request, response, filterChain);

    verify(jwtUtil, times(1)).validateAccessTokenAndRetrieveSubject(jwt);
    verify(customUserDetailsService, times(1)).loadUserByUsername(email);
    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void shouldThrowErrorWhenTokenIsInvalid() throws ServletException, IOException {
    val invalidToken = new JWTVerificationException("Invalid token");

    when(request.getHeader(anyString())).thenReturn("Bearer invalidToken");
    when(jwtUtil.validateAccessTokenAndRetrieveSubject(anyString())).thenThrow(invalidToken);

    jwtFilter.doFilterInternal(request, response, filterChain);

    verify(resolver, times(1))
        .resolveException(request, response, null, invalidToken);
  }

  @Test
  void shouldThrowErrorWhenTokenIsNull() throws ServletException, IOException {
    when(request.getHeader("Authorization")).thenReturn("Bearer ");
    jwtFilter.doFilterInternal(request, response, filterChain);

    verify(response, times(1)).sendError(HttpServletResponse.SC_BAD_REQUEST,
        "Invalid JWT Token in Bearer Header");
  }

  @ParameterizedTest
  @ValueSource(strings = {"", "Not bearer token"})
  void shouldThrowErrorWhenAuthHeaderIsBlank(String header) throws ServletException, IOException {
    when(request.getHeader("Authorization")).thenReturn(header);
    jwtFilter.doFilterInternal(request, response, filterChain);

    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void shouldThrowErrorWhenAuthHeaderIsNull() throws ServletException, IOException {
    when(request.getHeader("Authorization")).thenReturn(null);
    jwtFilter.doFilterInternal(request, response, filterChain);

    verify(filterChain, times(1)).doFilter(request, response);
  }
}