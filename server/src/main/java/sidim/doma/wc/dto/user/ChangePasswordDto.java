package sidim.doma.wc.dto.user;

public record ChangePasswordDto(
    Integer id,
    String oldPassword,
    String newPassword
) {
}
