package sidim.doma.wc.dto.user;

public record UpdateUserDto(
    Integer id,
    String name,
    String email,
    Integer role,
    Boolean isActive
) {
}
