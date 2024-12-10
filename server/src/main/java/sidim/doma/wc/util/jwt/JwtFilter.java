package sidim.doma.wc.util.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import sidim.doma.wc.service.CustomUserDetailsService;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private final CustomUserDetailsService customUserDetailsService;
  private final JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    val authHeader = request.getHeader("Authorization");
    if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
      val jwt = authHeader.substring(7);
      if (jwt.isBlank()) {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST,
            "Invalid JWT Token in Bearer Header");
      } else {
        val email = jwtUtil.validateAccessTokenAndRetrieveSubject(jwt);
        val userDetails = customUserDetailsService.loadUserByUsername(email);
        val authToken = new UsernamePasswordAuthenticationToken(
            email,
            userDetails.getPassword(),
            userDetails.getAuthorities());

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
      }

    } else {
      filterChain.doFilter(request, response);
    }
  }
}