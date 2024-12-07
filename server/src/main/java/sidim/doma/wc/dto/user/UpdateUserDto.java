package sidim.doma.wc.dto.user;

public record UpdateUserDto(
    Integer id,
    String name,
    String email,
    String password,
    Integer role,
    Boolean isActive
) {
}
