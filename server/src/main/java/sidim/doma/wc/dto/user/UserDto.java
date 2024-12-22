package sidim.doma.wc.dto.user;

import java.io.Serializable;
import java.time.LocalDate;

public record UserDto(
    Integer id,
    String name,
    String email,
    Integer role,
    Boolean isActive,
    LocalDate createdAt,
    Boolean accountNonExpired,
    LocalDate expirationDate
) implements Serializable {
}
