package sidim.doma.wc.dto.jwt;

public record JwtResponse(
    String accessToken,
    String refreshToken
) {
}