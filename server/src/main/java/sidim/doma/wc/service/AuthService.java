package sidim.doma.wc.service;

import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.Credentials;
import sidim.doma.wc.dto.jwt.JwtResponse;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.LoginCredentialException;
import sidim.doma.wc.util.jwt.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserService userService;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder encoder;

  public JwtResponse login(Credentials credentials) {
    val user = userService.getUserByEmail(credentials.email());

    checkNonLockedAccount(user);

    if (encoder.matches(credentials.password(), user.getPassword())) {
      val accessToken = jwtUtil.generateAccessToken(user);
      val refreshToken = jwtUtil.generateRefreshToken(user);

      return new JwtResponse(accessToken, refreshToken);
    } else {
      throw new LoginCredentialException("Invalid login credentials", HttpStatus.BAD_REQUEST);
    }
  }

  public void logout(Principal principal) {
    jwtUtil.deleteRefreshTokenPayload(principal.getName());
  }

  public JwtResponse getAccessToken(String refreshToken) {
    val email = jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken);

    val user = userService.getUserByEmail(email);

    checkNonLockedAccount(user);

    val accessToken = jwtUtil.generateAccessToken(user);
    return new JwtResponse(accessToken, null);
  }

  public JwtResponse getRefreshToken(String refreshToken) {
    val email = jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken);
    val user = userService.getUserByEmail(email);

    checkNonLockedAccount(user);

    val accessToken = jwtUtil.generateAccessToken(user);
    val newRefreshToken = jwtUtil.generateRefreshToken(user);

    return new JwtResponse(accessToken, newRefreshToken);
  }

  private void checkNonLockedAccount(User user) {
    if (Boolean.FALSE.equals(user.getIsActive())) {
      throw new LoginCredentialException("This account is locked", HttpStatus.LOCKED);
    }
  }
}
