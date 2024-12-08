package sidim.doma.wc.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

public record NewUserDto(
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters long")
    String name,
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    String email,
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters long")
    String password,
    @NotNull(message = "Role cannot be null")
    @Min(value = 1, message = "Role must be 1 (Admin) or 2 (User)")
    @Max(value = 2, message = "Role must be 1 (Admin) or 2 (User)")
    Integer role
) implements Serializable {
  public static NewUserDto from(NewUserDto dto) {
    return new NewUserDto(dto.name.trim(), dto.email.trim(), dto.password.trim(), dto.role);
  }
}
