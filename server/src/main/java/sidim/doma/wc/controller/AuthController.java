package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.Credentials;
import sidim.doma.wc.dto.jwt.JwtResponse;
import sidim.doma.wc.dto.jwt.RefreshJwtRequest;
import sidim.doma.wc.service.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> login(@Valid @RequestBody Credentials credentials) {
    val tokens = authService.login(credentials);

    return ResponseEntity.ok(tokens);
  }

  @PostMapping("/refresh")
  public ResponseEntity<JwtResponse> newAccessToken(
      @Valid @RequestBody RefreshJwtRequest request) {
    val accessToken = authService.getAccessToken(request.refreshToken());

    return ResponseEntity.ok(accessToken);
  }

  @DeleteMapping("/logout")
  public ResponseEntity<HttpStatus> logout(Principal principal) {
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    authService.logout(principal);
    return ResponseEntity.noContent().build();
  }
}
