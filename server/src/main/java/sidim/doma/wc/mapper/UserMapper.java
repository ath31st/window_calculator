package sidim.doma.wc.mapper;

import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.user.NewUserDto;
import sidim.doma.wc.dto.user.UserDto;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.util.Role;

@Component
@RequiredArgsConstructor
public class UserMapper {
  private final PasswordEncoder encoder;

  public User fromNewToEntity(NewUserDto dto) {
    return User.builder()
        .name(dto.name())
        .email(dto.email())
        .password(encoder.encode(dto.password()))
        .role(dto.role())
        .isActive(true)
        .build();
  }

  public UserDto fromEntityToDto(User user) {
    return new UserDto(
        user.getId(),
        user.getName(),
        user.getEmail(),
        Role.getRoleByValue(user.getRole()).name(),
        user.getIsActive(),
        user.getCreatedAt().atZone(ZoneId.systemDefault()).toLocalDate()
    );
  }
}
