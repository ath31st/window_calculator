package sidim.doma.wc.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

public record UpdateUserDto(
    @NotNull(message = "User ID cannot be null")
    Integer id,
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters long")
    String name,
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    String email,
    @NotNull(message = "Role cannot be null")
    @Min(value = 1, message = "Role must be 1 (Admin) or 2 (User)")
    @Max(value = 2, message = "Role must be 1 (Admin) or 2 (User)")
    Integer role,
    @NotNull(message = "Active status cannot be null")
    Boolean isActive,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    LocalDate accountExpirationDate
) implements Serializable {
  public static UpdateUserDto from(UpdateUserDto dto) {
    return new UpdateUserDto(
        dto.id(),
        dto.name().trim(),
        dto.email().trim(),
        dto.role(),
        dto.isActive(),
        dto.accountExpirationDate()
    );
  }
}
