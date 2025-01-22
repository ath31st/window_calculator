package sidim.doma.wc.util.jwt;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Optional;
import java.util.UUID;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import sidim.doma.wc.entity.RefreshTokenPayload;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.CustomJwtVerificationException;
import sidim.doma.wc.exception.RefreshTokenPayloadException;
import sidim.doma.wc.repository.RefreshTokenPayloadRepository;
import sidim.doma.wc.util.Role;

@ExtendWith(MockitoExtension.class)
class JwtUtilTest {

  @Mock
  private RefreshTokenPayloadRepository repository;

  @InjectMocks
  private JwtUtil jwtUtil;
  private final String secret = "Super_test_secret";
  private final String refreshSecret = "Super_test_refresh_secret";
  private static final String SUBJECT = "User Details";
  private static final String ROLE = "role";
  private static final String EMAIL = "email";
  private static final String ISSUER_FOR_TOKEN = "Win calc";

  private User user;
  private final String email = "test@test";

  @BeforeEach
  void setUp() {
    user = new User();
    user.setEmail(email);
    user.setRole(1);

    ReflectionTestUtils.setField(jwtUtil, "secret", secret);
    ReflectionTestUtils.setField(jwtUtil, "refreshSecret", refreshSecret);
    ReflectionTestUtils.setField(jwtUtil, "accessDuration", 10);
    ReflectionTestUtils.setField(jwtUtil, "refreshDuration", 1);
  }

  @Test
  void generateAccessTokenTest() {
    val token = jwtUtil.generateAccessToken(user);

    assertNotNull(token);
    assertTrue(token.startsWith("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"));
    assertTrue(token.contains("."));
  }

  @Test
  void generateRefreshTokenTest_whenEmailExists() {
    when(repository.existsByUserEmailIgnoreCase(email)).thenReturn(true);

    val refreshToken = jwtUtil.generateRefreshToken(user);
    val decodedJWT = JWT.decode(refreshToken);

    assertNotNull(refreshToken);
    assertEquals(email, decodedJWT.getClaim(EMAIL).asString());
    assertEquals(Role.ADMIN.name(), decodedJWT.getClaim(ROLE).asString());
    assertEquals(ISSUER_FOR_TOKEN, decodedJWT.getIssuer());
    assertEquals(SUBJECT, decodedJWT.getSubject());
  }

  @Test
  void generateRefreshTokenTest_whenEmailNotExists() {
    when(repository.existsByUserEmailIgnoreCase(email)).thenReturn(false);

    val refreshToken = jwtUtil.generateRefreshToken(user);
    val decodedJWT = JWT.decode(refreshToken);

    assertNotNull(refreshToken);
    assertEquals(email, decodedJWT.getClaim(EMAIL).asString());
    assertEquals(Role.ADMIN.name(), decodedJWT.getClaim(ROLE).asString());
    assertEquals(ISSUER_FOR_TOKEN, decodedJWT.getIssuer());
    assertEquals(SUBJECT, decodedJWT.getSubject());
  }

  @Test
  void validateAccessTokenAndRetrieveSubjectTest() {
    val token = createToken();

    val subject = jwtUtil.validateAccessTokenAndRetrieveSubject(token);

    assertEquals(email, subject);
  }

  private String createToken() {
    return JWT.create()
        .withSubject(SUBJECT)
        .withIssuer(ISSUER_FOR_TOKEN)
        .withClaim(ROLE, Role.ADMIN.name())
        .withClaim(EMAIL, email)
        .sign(Algorithm.HMAC256(secret));
  }

  @Test
  void validateRefreshTokenAndRetrieveSubject_whenUsernameInDatabase_shouldReturnSubject() {
    val refreshToken = jwtUtil.generateRefreshToken(user);
    val decodedJWT = JWT.decode(refreshToken);

    val refreshTokenPayload = new RefreshTokenPayload();
    refreshTokenPayload.setUser(user);
    refreshTokenPayload.setPayload(UUID.fromString(decodedJWT.getClaim("UUID").asString()));

    when(repository
        .findByUserEmailIgnoreCase(anyString()))
        .thenReturn(Optional.of(refreshTokenPayload));

    val result = jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken);

    assertThat(result).isEqualTo(email);
  }

  @Test
  void validateRefreshTokenAndRetrieveSubject_whenUsernameNotInDatabase_shouldThrowException() {
    val refreshToken = jwtUtil.generateRefreshToken(user);

    when(repository.findByUserEmailIgnoreCase(anyString())).thenReturn(Optional.empty());

    assertThatThrownBy(() -> jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken))
        .isInstanceOf(RefreshTokenPayloadException.class)
        .hasMessage("Payload not found!")
        .hasFieldOrPropertyWithValue("status", HttpStatus.UNAUTHORIZED);
  }

  @Test
  void validateRefreshTokenAndRetrieveSubject_whenUuidNotMatching_shouldThrowException() {
    val refreshToken = jwtUtil.generateRefreshToken(user);

    val refreshTokenPayload = new RefreshTokenPayload();
    refreshTokenPayload.setUser(user);
    refreshTokenPayload.setPayload(UUID.fromString("3b2633bf-2293-42dc-aa38-d5eeb63d7157"));

    when(repository
        .findByUserEmailIgnoreCase(anyString()))
        .thenReturn(Optional.of(refreshTokenPayload));

    assertThatThrownBy(() -> jwtUtil.validateRefreshTokenAndRetrieveSubject(refreshToken))
        .isInstanceOf(CustomJwtVerificationException.class)
        .hasMessage("Invalid token UUID")
        .hasFieldOrPropertyWithValue("status", HttpStatus.BAD_REQUEST);
  }

  @Test
  void deletePayloadRandomPieces() {
    when(repository.findByUserEmailIgnoreCase(email))
        .thenReturn(Optional.of(new RefreshTokenPayload()));

    jwtUtil.deleteRefreshTokenPayload(email);

    assertFalse(repository.findByUserEmailIgnoreCase(email).isEmpty());
  }

  @Test
  void deletePayloadRandomPieces_NotFound() {
    when(repository.findByUserEmailIgnoreCase(email)).thenReturn(Optional.empty());

    jwtUtil.deleteRefreshTokenPayload(email);

    assertTrue(repository.findByUserEmailIgnoreCase(email).isEmpty());
  }
}