package sidim.doma.wc.mapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.user.NewUserDto;
import sidim.doma.wc.dto.user.UserDto;
import sidim.doma.wc.entity.User;

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
        .createdAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())
        .accountNonExpired(true)
        .accountExpirationDate(dto.accountExpirationDate() == null
            ? null
            : dto.accountExpirationDate().atStartOfDay(ZoneId.systemDefault()).toInstant())
        .build();
  }

  public UserDto fromEntityToDto(User user) {
    return new UserDto(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getRole(),
        user.getIsActive(),
        user.getCreatedAt().atZone(ZoneId.systemDefault()).toLocalDate(),
        user.getAccountNonExpired(),
        user.getAccountExpirationDate() == null
            ? null
            : user.getAccountExpirationDate().atZone(ZoneId.systemDefault()).toLocalDate()
    );
  }
}
