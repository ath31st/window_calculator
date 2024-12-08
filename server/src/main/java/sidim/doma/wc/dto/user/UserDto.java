package sidim.doma.wc.dto.user;

import java.io.Serializable;
import java.time.LocalDate;

public record UserDto(
    Integer id,
    String name,
    String email,
    String role,
    Boolean isActive,
    LocalDate createdAt
) implements Serializable {
}
