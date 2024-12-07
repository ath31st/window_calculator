package sidim.doma.wc.dto.user;

public record NewUserDto(
    String name,
    String email,
    String password,
    Integer role
) {
}
