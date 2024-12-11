package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.security.Principal;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import sidim.doma.wc.dto.Credentials;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.LoginCredentialException;
import sidim.doma.wc.util.jwt.JwtUtil;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

  @Mock
  private UserService userService;

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private PasswordEncoder mockEncoder;

  @InjectMocks
  private AuthService authService;

  private User user;
  private final String email = "test@test.com";
  private final String password = "test_password";
  private String encodedPassword;
  private final String accessToken = "access_token";
  private final String refreshToken = "refresh_token";
  private final String newRefreshToken = "test_new_refresh_token";

  @BeforeEach
  void setUp() {
    val encoder = new BCryptPasswordEncoder();
    encodedPassword = encoder.encode(password);

    user = User.builder()
        .role(1)
        .isActive(true)
        .email(email)
        .password(encodedPassword)
        .build();
  }

  @Test
  void login_WithValidCredentials_ShouldReturnJwtResponse() {
    val credentials = new Credentials(email, password);

    when(userService.getUserByEmail(email)).thenReturn(user);
    when(mockEncoder.matches(password, encodedPassword)).thenReturn(true);
    when(jwtUtil.generateAccessToken(user)).thenReturn(accessToken);
    when(jwtUtil.generateRefreshToken(user)).thenReturn(refreshToken);

    val response = authService.login(credentials);

    assertNotNull(response);
    assertEquals(accessToken, response.accessToken());
    assertEquals(refreshToken, response.refreshToken());

    verify(userService, times(1)).getUserByEmail(email);
    verify(mockEncoder, times(1)).matches(password, encodedPassword);
    verify(jwtUtil, times(1)).generateAccessToken(user);
    verify(jwtUtil, times(1)).generateRefreshToken(user);
  }

  @Test
  void login_WithInvalidCredentials_ShouldThrowLoginCredentialException() {
    val credentials = new Credentials(email, password);

    when(userService.getUserByEmail(email)).thenReturn(user);
    when(mockEncoder.matches(password, encodedPassword)).thenReturn(false);

    assertThrows(LoginCredentialException.class,
        () -> authService.login(credentials),
        "Invalid login credentials");

    verify(userService, times(1)).getUserByEmail(email);
    verify(mockEncoder, times(1)).matches(password, encodedPassword);
    verify(jwtUtil, never()).generateAccessToken(user);
    verify(jwtUtil, never()).generateRefreshToken(user);
  }

  @Test
  void login_WithInvalidCredentials_ShouldThrowLoginCredentialException_AccountIsLocked() {
    val credentials = new Credentials(email, password);
    user.setIsActive(false);

    when(userService.getUserByEmail(email)).thenReturn(user);

    assertThrows(LoginCredentialException.class,
        () -> authService.login(credentials),
        "This account is locked");

    verify(userService, times(1)).getUserByEmail(email);
    verify(mockEncoder, never()).matches(password, encodedPassword);
    verify(jwtUtil, never()).generateAccessToken(user);
    verify(jwtUtil, never()).generateRefreshToken(user);
  }

  @Test
  void login_WithNonExistentManager_ShouldThrowLoginCredentialException() {
    val credentials = new Credentials(email, password);

    when(userService.getUserByEmail(email)).thenReturn(user);
    when(mockEncoder.matches(password, encodedPassword)).thenReturn(false);

    assertThrows(LoginCredentialException.class,
        () -> authService.login(credentials),
        "Invalid login credentials");

    verify(userService, times(1)).getUserByEmail(email);
    verify(mockEncoder, times(1)).matches(anyString(), anyString());
    verify(jwtUtil, never()).generateAccessToken(any(User.class));
    verify(jwtUtil, never()).generateRefreshToken(any(User.class));
  }

  @Test
  void logout_ShouldDeletePayloadRandomPieces() {
    val principal = mock(Principal.class);

    when(principal.getName()).thenReturn(email);

    authService.logout(principal);

    verify(jwtUtil, times(1)).deleteRefreshTokenPayload(email);
  }

  @Test
  void getAccessToken_WithValidRefreshToken_ShouldReturnJwtResponse() {
    when(jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken)).thenReturn(email);
    when(userService.getUserByEmail(email)).thenReturn(user);
    when(jwtUtil.generateAccessToken(user)).thenReturn(accessToken);

    val response = authService.getAccessToken(refreshToken);

    assertNotNull(response);
    assertEquals(accessToken, response.accessToken());
    assertNull(response.refreshToken());

    verify(jwtUtil, times(1)).validateRefreshTokenAndRetrieveSubject(refreshToken);
    verify(userService, times(1)).getUserByEmail(email);
    verify(jwtUtil, times(1)).generateAccessToken(user);
  }

  @Test
  void getAccessToken_WithInvalidRefreshToken_ShouldThrowException() {
    when(jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken)).thenReturn(null);

    assertThrows(Exception.class, () -> authService.getAccessToken(refreshToken));

    verify(jwtUtil, times(1)).validateRefreshTokenAndRetrieveSubject(refreshToken);
    verify(userService, never()).getUserByEmail(anyString());
    verify(jwtUtil, never()).generateAccessToken(any(User.class));
  }

  @Test
  void getAccessToken_WithNonExistentManager_ShouldThrowException() {
    when(jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken)).thenReturn(email);
    when(userService.getUserByEmail(email)).thenReturn(null);

    assertThrows(Exception.class, () -> authService.getAccessToken(refreshToken));

    verify(jwtUtil, times(1)).validateRefreshTokenAndRetrieveSubject(refreshToken);
    verify(userService, times(1)).getUserByEmail(email);
    verify(jwtUtil, never()).generateAccessToken(any(User.class));
  }

  @Test
  void getRefreshToken_WithValidRefreshToken_ShouldReturnJwtResponse() {
    //when
    when(jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken)).thenReturn(email);
    when(userService.getUserByEmail(email)).thenReturn(user);
    when(jwtUtil.generateAccessToken(user)).thenReturn(accessToken);
    when(jwtUtil.generateRefreshToken(user)).thenReturn(newRefreshToken);

    val response = authService.getRefreshToken(refreshToken);

    assertNotNull(response);
    assertEquals(accessToken, response.accessToken());
    assertEquals(newRefreshToken, response.refreshToken());

    verify(jwtUtil, times(1)).validateRefreshTokenAndRetrieveSubject(refreshToken);
    verify(userService, times(1)).getUserByEmail(email);
    verify(jwtUtil, times(1)).generateAccessToken(user);
    verify(jwtUtil, times(1)).generateRefreshToken(user);
  }

  @Test
  void getRefreshToken_WithInvalidRefreshToken_ShouldThrowException() {
    when(jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken)).thenReturn(null);

    assertThrows(Exception.class, () -> authService.getRefreshToken(refreshToken));

    verify(jwtUtil, times(1)).validateRefreshTokenAndRetrieveSubject(refreshToken);
    verify(userService, never()).getUserByEmail(anyString());
    verify(jwtUtil, never()).generateAccessToken(any(User.class));
    verify(jwtUtil, never()).generateRefreshToken(any(User.class));
  }

  @Test
  void getRefreshToken_WithNonExistentManager_ShouldThrowException() {
    //when
    when(jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken)).thenReturn(email);
    when(userService.getUserByEmail(email)).thenReturn(null);

    //then
    assertThrows(Exception.class, () -> authService.getRefreshToken(refreshToken));

    verify(jwtUtil, times(1)).validateRefreshTokenAndRetrieveSubject(refreshToken);
    verify(userService, times(1)).getUserByEmail(email);
    verify(jwtUtil, never()).generateAccessToken(any(User.class));
    verify(jwtUtil, never()).generateRefreshToken(any(User.class));
  }
}