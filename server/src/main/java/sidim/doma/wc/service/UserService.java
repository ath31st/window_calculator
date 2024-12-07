package sidim.doma.wc.service;

import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.user.ChangePasswordDto;
import sidim.doma.wc.dto.user.NewUserDto;
import sidim.doma.wc.dto.user.UpdateUserDto;
import sidim.doma.wc.dto.user.UserDto;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.UserServiceException;
import sidim.doma.wc.mapper.UserMapper;
import sidim.doma.wc.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder encoder;
  private final UserMapper userMapper;

  public UserDto createNewUser(NewUserDto dto) {
    checkExistsUser(dto.email());

    val user = userMapper.fromNewToEntity(dto);
    val savedUser = userRepository.save(user);

    return userMapper.fromEntityToDto(savedUser);
  }

  public User getUserByEmail(String email) {
    return userRepository.findByEmailIgnoreCase(email).orElseThrow(
        () -> new UserServiceException("User with email " + email + " not found!",
            HttpStatus.NOT_FOUND));
  }

  public void deleteUser(Integer id) {
    val user = getUserById(id);

    userRepository.delete(user);
  }

  private void checkExistsUser(String email) {
    if (userRepository.findByEmailIgnoreCase(email).isPresent()) {
      throw new UserServiceException("User with email " + email
          + " already exists!", HttpStatus.CONFLICT);
    }
  }

  public User getUserById(Integer id) {
    return userRepository.findById(id).orElseThrow(
        () -> new UserServiceException("User with id " + id + " not found!",
            HttpStatus.NOT_FOUND));
  }

  public UserDto updateUser(UpdateUserDto dto) {
    val user = getUserById(dto.id());

    if (!user.getEmail().equals(dto.email())) {
      checkExistsUser(dto.email());
    }

    user.setName(dto.name());
    user.setEmail(dto.email());
    user.setRole(dto.role());
    user.setIsActive(dto.isActive());

    return userMapper.fromEntityToDto(userRepository.save(user));
  }

  public void changePassword(ChangePasswordDto dto, String authName) {
    val user = getUserById(dto.id());

    if (!Objects.equals(authName, user.getEmail())) {
      throw new UserServiceException("You can change only your own password!",
          HttpStatus.BAD_REQUEST);
    }

    if (!encoder.matches(dto.oldPassword(), user.getPassword())) {
      throw new UserServiceException("Old password is not correct!",
          HttpStatus.BAD_REQUEST);
    }

    user.setPassword(encoder.encode(dto.newPassword()));
    userRepository.save(user);
  }
}
