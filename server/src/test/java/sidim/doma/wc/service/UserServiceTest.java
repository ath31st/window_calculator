package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentCaptor.forClass;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import sidim.doma.wc.dto.user.ChangePasswordDto;
import sidim.doma.wc.dto.user.NewUserDto;
import sidim.doma.wc.dto.user.UpdateUserDto;
import sidim.doma.wc.dto.user.UserDto;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.UserServiceException;
import sidim.doma.wc.mapper.UserMapper;
import sidim.doma.wc.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  private UserMapper userMapper;

  @Mock
  private PasswordEncoder encoder;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  private final Integer id = 1;
  private final String name = "test_name";
  private final String updateName = "update_test_name";
  private final String email = "test_email";
  private final String updateEmail = "update_test_email";
  private final String password = "test_password";
  private final Integer role = 1;
  private final Boolean isActive = true;

  private NewUserDto newUserDto;
  private UserDto expectedUserDto;
  private UpdateUserDto updateUserDto;
  private User user;

  @BeforeEach
  void setUp() {
    newUserDto = new NewUserDto(name, email, password, role, LocalDate.now());
    expectedUserDto = new UserDto(id, name, email, role, isActive, LocalDate.now(), true, null);
    updateUserDto = new UpdateUserDto(id, updateName, updateEmail, role, isActive, LocalDate.now());
    user = new User();
    user.setId(id);
    user.setEmail(email);
    user.setPassword(password);
  }

  @Test
  void getUserById_success() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));

    val result = userService.getUserById(id);

    assertEquals(user, result);
  }

  @Test
  void getUserById_whenUserNotFound_thenThrowException() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.empty());

    val exception = assertThrows(UserServiceException.class, () -> userService.getUserById(id));

    assertEquals("User with id " + id + " not found!", exception.getMessage());
    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
  }

  @Test
  void getUser_success() {
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.of(user));

    val result = userService.getUserByEmail(email);

    assertEquals(user, result);
  }

  @Test
  void getUser_whenUserNotFound_thenThrowException() {
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.empty());

    val exception = assertThrows(UserServiceException.class, () -> userService.getUserByEmail(email));

    assertEquals("User with email " + email + " not found!", exception.getMessage());
    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
  }

  @Test
  void createNewUser_success() {
    when(userMapper.fromNewToEntity(any(NewUserDto.class))).thenReturn(user);
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(expectedUserDto);

    val result = userService.createNewUser(newUserDto);

    verify(userRepository).save(user);
    assertEquals(expectedUserDto, result);
  }

  @Test
  void createNewUser_whenUserAlreadyExists_thenThrowException() {
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.of(user));

    val exception = assertThrows(UserServiceException.class, () -> userService.createNewUser(newUserDto));

    assertEquals("User with email " + email + " already exists!", exception.getMessage());
    assertEquals(HttpStatus.CONFLICT, exception.getStatus());
  }

  @Test
  void deleteUser_success() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));

    userService.deleteUser(id);

    verify(userRepository).delete(user);
  }

  @Test
  void deleteUser_whenUserNotFound_thenThrowException() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.empty());

    val exception = assertThrows(UserServiceException.class, () -> userService.deleteUser(id));

    assertEquals("User with id " + id + " not found!", exception.getMessage());
    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
  }

  @Test
  void updateUser_success() {
    user.setEmail(email);
    val updatedUserDto = new UserDto(id, updateName, updateEmail, role, isActive, LocalDate.now(), true, null);

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.empty());
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(updatedUserDto);

    val result = userService.updateUser(updateUserDto);

    verify(userRepository).save(user);
    assertEquals(updatedUserDto, result);
  }

  @Test
  void updateUser_success_withExpirationDate() {
    user.setEmail(email);
    val updateUserDtoWithExpirationDate = new UpdateUserDto(id, updateName, updateEmail, role, isActive,
        LocalDate.now().plusDays(1));
    val updatedUserDto = new UserDto(id, updateName, updateEmail, role, isActive,
        LocalDate.now(), true, LocalDate.now().plusDays(1));

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.empty());
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(updatedUserDto);

    val result = userService.updateUser(updateUserDtoWithExpirationDate);

    verify(userRepository).save(user);
    assertEquals(updatedUserDto, result);
  }

  @Test
  void updateUser_success_withExpirationDate_andExpiredAccount() {
    user.setEmail(email);
    user.setAccountNonExpired(false);

    val updateUserDtoWithExpirationDate = new UpdateUserDto(id, updateName, updateEmail, role,
        isActive, LocalDate.now().plusDays(1));

    val updatedUserDto = new UserDto(id, updateName, updateEmail, role, isActive,
        LocalDate.now(), true, LocalDate.now().plusDays(1));

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.empty());
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(updatedUserDto);

    val result = userService.updateUser(updateUserDtoWithExpirationDate);

    ArgumentCaptor<User> userCaptor = forClass(User.class);
    verify(userRepository).save(userCaptor.capture());
    User capturedUser = userCaptor.getValue();

    assertEquals(updateName, capturedUser.getName());
    assertEquals(updateEmail, capturedUser.getEmail());
    assertEquals(LocalDate.now().plusDays(1),
        capturedUser.getAccountExpirationDate().atZone(ZoneId.systemDefault()).toLocalDate());
    assertEquals(true, capturedUser.getAccountNonExpired());

    assertEquals(updatedUserDto, result);
  }

  @Test
  void updateUser_success_withoutExpirationDate_andExpiredAccount() {
    user.setEmail(email);
    user.setAccountNonExpired(false);

    val updateUserDtoWithExpirationDate = new UpdateUserDto(id, updateName, updateEmail, role,
        isActive, null);

    val updatedUserDto = new UserDto(id, updateName, updateEmail, role, isActive,
        LocalDate.now(), true, null);

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.empty());
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(updatedUserDto);

    val result = userService.updateUser(updateUserDtoWithExpirationDate);

    ArgumentCaptor<User> userCaptor = forClass(User.class);
    verify(userRepository).save(userCaptor.capture());
    User capturedUser = userCaptor.getValue();

    assertEquals(updateName, capturedUser.getName());
    assertEquals(updateEmail, capturedUser.getEmail());
    assertNull(capturedUser.getAccountExpirationDate());
    assertEquals(true, capturedUser.getAccountNonExpired());

    assertEquals(updatedUserDto, result);
  }

  @Test
  void updateUser_whenUserAlreadyExists_thenThrowException() {
    user.setEmail(email);

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userRepository.findByEmailIgnoreCase(any(String.class)))
        .thenReturn(java.util.Optional.of(user));

    val exception = assertThrows(UserServiceException.class, () -> userService.updateUser(updateUserDto));

    assertEquals("User with email " + updateEmail + " already exists!", exception.getMessage());
    assertEquals(HttpStatus.CONFLICT, exception.getStatus());
  }

  @Test
  void updateUser_whenUserNotFound_thenThrowException() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.empty());

    val exception = assertThrows(UserServiceException.class, () -> userService.updateUser(updateUserDto));

    assertEquals("User with id " + id + " not found!", exception.getMessage());
    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
  }

  @Test
  void changePassword_success() {
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, password, newPassword);

    when(encoder.matches(any(String.class), any(String.class))).thenReturn(true);
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userRepository.save(any(User.class))).thenReturn(user);

    userService.changePassword(changePasswordDto, email);

    verify(userRepository).save(user);
  }

  @Test
  void changePassword_whenUserNotFound_thenThrowException() {
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, password, newPassword);

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.empty());

    val exception = assertThrows(UserServiceException.class,
        () -> userService.changePassword(changePasswordDto, email));

    assertEquals("User with id " + id + " not found!", exception.getMessage());
    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
  }

  @Test
  void changePassword_whenUserEmailNotMatchWithAuthenticatedUser_thenThrowException() {
    user.setEmail("another_email");
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, password, newPassword);

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));

    val exception = assertThrows(UserServiceException.class,
        () -> userService.changePassword(changePasswordDto, email));

    assertEquals("You can change only your own password!", exception.getMessage());
    assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
  }

  @Test
  void changePassword_whenOldPasswordIsNotCorrect_thenThrowException() {
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, "wrong_password", newPassword);

    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(encoder.matches(any(String.class), any(String.class))).thenReturn(false);

    val exception = assertThrows(UserServiceException.class,
        () -> userService.changePassword(changePasswordDto, email));

    assertEquals("Old password is not correct!", exception.getMessage());
    assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
  }

  @Test
  void getUsers_success_1() {
    val sort = Sort.by(Sort.Direction.ASC, "email");

    val user1 = new User(1, "Alice", "alice@example.com", "password1", 2, true, null, null, true, null);
    val user2 = new User(2, "Bob", "bob@example.com", "password2", 1, true, null, null, true, null);
    val user3 = new User(3, "Charlie", "charlie@example.com", "password3", 2, true, null, null, true, null);

    val sortedUsers = List.of(user1, user2, user3);

    val userDto1 = new UserDto(1, "Alice", "alice@example.com", role, true, LocalDate.now(), true, null);
    val userDto2 = new UserDto(2, "Bob", "bob@example.com", 1, true, LocalDate.now(), true, null);
    val userDto3 = new UserDto(3, "Charlie", "charlie@example.com", role, true, LocalDate.now(), true, null);

    when(userRepository.findAll(sort)).thenReturn(sortedUsers);
    when(userMapper.fromEntityToDto(user1)).thenReturn(userDto1);
    when(userMapper.fromEntityToDto(user2)).thenReturn(userDto2);
    when(userMapper.fromEntityToDto(user3)).thenReturn(userDto3);

    val result = userService.getUsers(null, true);

    verify(userRepository).findAll(sort);
    assertEquals(List.of(userDto1, userDto2, userDto3), result);
  }

  @Test
  void getUsers_success_2() {
    val sort = Sort.by(Sort.Direction.DESC, "email");
    val users = List.of(user);

    when(userRepository.findAll(sort)).thenReturn(users);
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(expectedUserDto);

    val result = userService.getUsers(null, false);

    verify(userRepository).findAll(sort);
    assertEquals(List.of(expectedUserDto), result);
  }

  @Test
  void getUsers_success_3() {
    val sort = Sort.by(Sort.Direction.ASC, "email");
    val user1 = new User(1, "Alice", email, "password1", role, true, null, null, true, null);
    val userDto1 = new UserDto(1, "Alice", email, role, true, LocalDate.now(), true, null);
    val sortedUsers = List.of(user1);

    when(userRepository.findByEmailContainingIgnoreCase(email, sort)).thenReturn(sortedUsers);
    when(userMapper.fromEntityToDto(user1)).thenReturn(userDto1);

    val result = userService.getUsers(email, true);

    verify(userRepository).findByEmailContainingIgnoreCase(email, sort);
    assertEquals(List.of(userDto1), result);
  }

  @Test
  void getUserDtoById_success() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.of(user));
    when(userMapper.fromEntityToDto(any(User.class))).thenReturn(expectedUserDto);

    val result = userService.getUserDtoById(id);

    assertEquals(expectedUserDto, result);
  }

  @Test
  void getUserDtoById_whenUserNotFound_thenThrowException() {
    when(userRepository.findById(any(Integer.class)))
        .thenReturn(java.util.Optional.empty());

    assertThrows(UserServiceException.class, () -> userService.getUserDtoById(id));
  }
}