package sidim.doma.wc.util.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import sidim.doma.wc.entity.RefreshTokenPayload;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.CustomJwtVerificationException;
import sidim.doma.wc.exception.RefreshTokenPayloadException;
import sidim.doma.wc.repository.RefreshTokenPayloadRepository;
import sidim.doma.wc.util.Role;

@Component
@RequiredArgsConstructor
public class JwtUtil {
  @Value("${jwt.access.duration}")
  private int accessDuration;
  @Value("${jwt.refresh.duration}")
  private int refreshDuration;
  @Value("${jwt.access.secret}")
  private String secret;
  @Value("${jwt.refresh.secret}")
  private String refreshSecret;
  private static final String SUBJECT = "User Details";
  private static final String USER_ID = "userId";
  private static final String ROLE = "role";
  private static final String EMAIL = "email";
  private static final String ISSUER_FOR_TOKEN = "Win calc";

  private final RefreshTokenPayloadRepository payloadRepository;

  public String generateAccessToken(User user) {
    val now = LocalDateTime.now();
    val accessExpirationInstant =
        now.plusMinutes(accessDuration).atZone(ZoneId.systemDefault()).toInstant();

    return JWT.create()
        .withSubject(SUBJECT)
        .withClaim(USER_ID, user.getId())
        .withClaim(ROLE, Role.getRoleByValue(user.getRole()).name())
        .withClaim(EMAIL, user.getEmail())
        .withExpiresAt(accessExpirationInstant)
        .withIssuer(ISSUER_FOR_TOKEN)
        .sign(Algorithm.HMAC256(secret));
  }

  public String generateRefreshToken(User user) {
    val now = LocalDateTime.now();
    val refreshExpirationInstant =
        now.plusDays(refreshDuration).atZone(ZoneId.systemDefault()).toInstant();
    val uuid = UUID.randomUUID();

    if (payloadRepository.existsByUserEmailIgnoreCase(user.getEmail())) {
      payloadRepository.updatePayloadByEmailIgnoreCase(uuid, user.getEmail());
    } else {
      val payload = RefreshTokenPayload.builder()
          .user(user)
          .payload(uuid)
          .createdAt(now.atZone(ZoneId.systemDefault()).toInstant())
          .expiryDate(refreshExpirationInstant)
          .build();

      payloadRepository.save(payload);
    }

    return JWT.create()
        .withSubject(SUBJECT)
        .withClaim(USER_ID, user.getId())
        .withClaim(ROLE, Role.getRoleByValue(user.getRole()).name())
        .withClaim(EMAIL, user.getEmail())
        .withExpiresAt(refreshExpirationInstant)
        .withIssuer(ISSUER_FOR_TOKEN)
        .withPayload(Collections.singletonMap("UUID", uuid.toString()))
        .sign(Algorithm.HMAC256(refreshSecret));
  }

  public String validateAccessTokenAndRetrieveSubject(String token) {
    val verifier = JWT.require(Algorithm.HMAC256(secret))
        .withSubject(SUBJECT)
        .withIssuer(ISSUER_FOR_TOKEN)
        .build();
    val jwt = verifier.verify(token);
    return jwt.getClaim(EMAIL).asString();
  }

  public String validateRefreshTokenAndRetrieveSubject(String token) {
    val verifier = JWT.require(Algorithm.HMAC256(refreshSecret))
        .withSubject(SUBJECT)
        .withIssuer(ISSUER_FOR_TOKEN)
        .build();
    val jwt = verifier.verify(token);
    val email = jwt.getClaim(EMAIL).asString();

    Optional<RefreshTokenPayload> rtp =
        payloadRepository.findByUserEmailIgnoreCase(email);
    if (rtp.isEmpty()) {
      throw new RefreshTokenPayloadException("Payload not found!", HttpStatus.NOT_FOUND);
    }

    val savedUuid = rtp.get().getPayload();

    if (!savedUuid.equals(UUID.fromString(jwt.getClaim("UUID").asString()))) {
      throw new CustomJwtVerificationException("Invalid token UUID", HttpStatus.BAD_REQUEST);
    }
    return email;
  }

  public void deleteRefreshTokenPayload(String email) {
    Optional<RefreshTokenPayload> rtp =
        payloadRepository.findByUserEmailIgnoreCase(email);
    rtp.ifPresent(payloadRepository::delete);
  }
}