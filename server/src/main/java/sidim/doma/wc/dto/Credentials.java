package sidim.doma.wc.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record Credentials(
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    String email,
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters long")
    String password
) {
}