package sidim.doma.wc.dto.jwt;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import sidim.doma.wc.util.RegExpression;

public record RefreshJwtRequest(
    @NotNull(message = "Refresh token is required and cannot be null")
    @Pattern(regexp = RegExpression.TOKEN, message = "Invalid token format")
    String refreshToken
) {
}