package sidim.doma.wc.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {

  @Override
  public void handle(HttpServletRequest request,
                     HttpServletResponse response,
                     AccessDeniedException accessDeniedException) throws IOException {

    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    response.getOutputStream().println("{ \"timestamp\": \"" + LocalDateTime.now() + "\"\n\t"
        + "\"status\": \"" + HttpStatus.FORBIDDEN + "\"\n\t"
        + "\"error\": \"" + accessDeniedException.getMessage() + "\" }");
  }
}