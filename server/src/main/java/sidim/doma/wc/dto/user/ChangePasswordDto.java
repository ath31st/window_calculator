package sidim.doma.wc.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

public record ChangePasswordDto(
    @NotNull(message = "User ID cannot be null")
    Integer id,
    @NotBlank(message = "Old password cannot be blank")
    @Size(min = 6, max = 50, message = "Old password must be between 6 and 50 characters long")
    String oldPassword,
    @NotBlank(message = "New password cannot be blank")
    @Size(min = 6, max = 50, message = "New password must be between 6 and 50 characters long")
    String newPassword
) implements Serializable {
  public static ChangePasswordDto from(ChangePasswordDto dto) {
    return new ChangePasswordDto(dto.id, dto.oldPassword.trim(), dto.newPassword.trim());
  }
}
