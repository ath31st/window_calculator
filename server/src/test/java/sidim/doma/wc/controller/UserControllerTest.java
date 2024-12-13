package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.user.ChangePasswordDto;
import sidim.doma.wc.dto.user.NewUserDto;
import sidim.doma.wc.dto.user.UpdateUserDto;
import sidim.doma.wc.dto.user.UserDto;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.exception.UserServiceException;
import sidim.doma.wc.service.CustomUserDetailsService;
import sidim.doma.wc.service.UserService;
import sidim.doma.wc.util.jwt.JwtUtil;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

  private static final String BASE_URL = "/api/v1/users";

  @MockBean
  private UserService userService;

  @MockBean
  private CustomUserDetailsService customUserDetailsService;

  @MockBean
  private JwtUtil jwtUtil;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  private final Integer id = 1;
  private final String name = "test_name";
  private final String updateName = "update_test_name";
  private final String email = "test_email@test.com";
  private final String updateEmail = "update_test_email@test.com";
  private final String password = "test_password";
  private final Integer role = 2;
  private final Boolean isActive = true;

  private NewUserDto newUserDto;
  private UserDto expectedUserDto;
  private UpdateUserDto updateUserDto;

  @BeforeEach
  void setUp() {
    newUserDto = new NewUserDto(name, email, password, role);
    expectedUserDto = new UserDto(id, name, email, role, isActive, LocalDate.now());
    updateUserDto = new UpdateUserDto(id, updateName, updateEmail, role, isActive);
    User user = new User();
    user.setId(id);
    user.setEmail(email);
    user.setPassword(password);
  }

  @Test
  void createUser_validDataProvided() throws Exception {
    when(userService.createNewUser(any(NewUserDto.class))).thenReturn(expectedUserDto);

    val result = mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newUserDto))
    ).andExpect(status().isCreated()).andReturn();

    val content = result.getResponse().getContentAsString();
    val userDto = objectMapper.readValue(content, UserDto.class);

    assertEquals(id, userDto.id());
    assertEquals(name, userDto.name());
    assertEquals(email, userDto.email());
    assertEquals(role, userDto.role());
    assertEquals(isActive, userDto.isActive());

    verify(userService).createNewUser(any(NewUserDto.class));
  }

  @Test
  void createUser_validDataProvided_trimmed() throws Exception {
    val nameWithSpaces = "  " + name + "  ";
    val passwordWithSpaces = "  " + password + "  ";
    val newUserDtoWithSpaces = new NewUserDto(nameWithSpaces, email, passwordWithSpaces, role);

    when(userService.createNewUser(any(NewUserDto.class))).thenReturn(expectedUserDto);

    val result = mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newUserDtoWithSpaces))
    ).andExpect(status().isCreated()).andReturn();

    val content = result.getResponse().getContentAsString();
    val userDtoResult = objectMapper.readValue(content, UserDto.class);

    assertEquals(id, userDtoResult.id());
    assertEquals(name, userDtoResult.name());
    assertEquals(email, userDtoResult.email());
    assertEquals(role, userDtoResult.role());
    assertEquals(isActive, userDtoResult.isActive());

    verify(userService).createNewUser(any(NewUserDto.class));
  }

  @Test
  void createUser_whenUserAlreadyExists_thenThrowException() throws Exception {
    when(userService.createNewUser(any(NewUserDto.class)))
        .thenThrow(new UserServiceException("User with email " + email + " already exists!", HttpStatus.CONFLICT));

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newUserDto))
    ).andExpect(status().isConflict()).andReturn();

    verify(userService).createNewUser(any(NewUserDto.class));
  }

  @Test
  void createUser_whenInvalidDataProvided_thenThrowException() throws Exception {
    when(userService.createNewUser(any(NewUserDto.class)))
        .thenThrow(new UserServiceException("Invalid data provided!", HttpStatus.BAD_REQUEST));

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newUserDto))
    ).andExpect(status().isBadRequest()).andReturn();

    verify(userService).createNewUser(any(NewUserDto.class));
  }

  @Test
  void updateUser_validDataProvided() throws Exception {
    val updatedUserDto = new UserDto(id, updateName, updateEmail, role, isActive, LocalDate.now());

    when(userService.updateUser(any(UpdateUserDto.class))).thenReturn(updatedUserDto);

    val result = mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateUserDto))
    ).andExpect(status().isOk()).andReturn();

    val content = result.getResponse().getContentAsString();
    val userDto = objectMapper.readValue(content, UserDto.class);

    assertEquals(id, userDto.id());
    assertEquals(updateName, userDto.name());
    assertEquals(updateEmail, userDto.email());
    assertEquals(role, userDto.role());
    assertEquals(isActive, userDto.isActive());

    verify(userService).updateUser(any(UpdateUserDto.class));
  }

  @Test
  void updateUser_whenUserNotFound_thenThrowException() throws Exception {
    when(userService.updateUser(any(UpdateUserDto.class)))
        .thenThrow(new UserServiceException("User with id " + id + " not found!", HttpStatus.NOT_FOUND));

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateUserDto))
    ).andExpect(status().isNotFound()).andReturn();

    verify(userService).updateUser(any(UpdateUserDto.class));
  }

  @Test
  void updateUser_whenInvalidDataProvided_thenThrowException_1() throws Exception {
    when(userService.updateUser(any(UpdateUserDto.class)))
        .thenThrow(new UserServiceException("Invalid data provided!", HttpStatus.BAD_REQUEST));

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateUserDto))
    ).andExpect(status().isBadRequest()).andReturn();

    verify(userService).updateUser(any(UpdateUserDto.class));
  }

  @Test
  void updateUser_whenInvalidDataProvided_thenThrowException_2() throws Exception {
    val invalidUpdateUserDto = new UpdateUserDto(id, null, null, role, isActive);

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(invalidUpdateUserDto))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void updateUser_whenInvalidDataProvided_thenThrowException_3() throws Exception {
    val invalidUpdateUserDto = new UpdateUserDto(id, name, email, null, isActive);

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(invalidUpdateUserDto))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void deleteUser_validDataProvided() throws Exception {
    mockMvc.perform(delete(BASE_URL + "/{id}", id))
        .andExpect(status().isNoContent()).andReturn();

    verify(userService).deleteUser(id);
  }

  @Test
  void deleteUser_whenUserNotFound_thenThrowException() throws Exception {
    doThrow(new UserServiceException("User with id " + id + " not found!", HttpStatus.NOT_FOUND))
        .when(userService).deleteUser(id);

    mockMvc.perform(delete(BASE_URL + "/{id}", id))
        .andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void changePassword_validDataProvided() throws Exception {
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, password, newPassword);
    Principal mockPrincipal = () -> email;

    mockMvc.perform(put(BASE_URL + "/password")
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(changePasswordDto))
        .principal(mockPrincipal)
    ).andExpect(status().isNoContent()).andReturn();
  }

  @Test
  void changePassword_whenUserNotFound_thenThrowException() throws Exception {
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, password, newPassword);
    Principal mockPrincipal = () -> email;

    doThrow(new UserServiceException("User with id " + id + " not found!", HttpStatus.NOT_FOUND))
        .when(userService).changePassword(any(ChangePasswordDto.class), anyString());

    mockMvc.perform(put(BASE_URL + "/password")
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(changePasswordDto))
        .principal(mockPrincipal)
    ).andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void changePassword_whenInvalidDataProvided_thenThrowException() throws Exception {
    val changePasswordDto = new ChangePasswordDto(id, password, null);

    mockMvc.perform(put(BASE_URL + "/password")
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(changePasswordDto))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void changePassword_whenUserEmailDoesNotMatch_thenThrowException() throws Exception {
    val newPassword = "new_password";
    val changePasswordDto = new ChangePasswordDto(id, password, newPassword);
    Principal mockPrincipal = () -> "wrong_email";

    doThrow(new UserServiceException("You can change only your own password!", HttpStatus.BAD_REQUEST))
        .when(userService).changePassword(changePasswordDto, "wrong_email");

    mockMvc.perform(put(BASE_URL + "/password")
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(changePasswordDto))
        .principal(mockPrincipal)
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void getUsers_validDataProvided_1() throws Exception {
    val userDto1 = new UserDto(1, "Alice", "alice@example.com", role, true, LocalDate.now());
    val userDto2 = new UserDto(2, "Bob", "bob@example.com", role, true, LocalDate.now());
    val userDto3 = new UserDto(3, "Charlie", "charlie@example.com", role, true, LocalDate.now());

    List<UserDto> expectedUserDtos = List.of(userDto1, userDto2, userDto3);

    when(userService.getUsers(null, true)).thenReturn(expectedUserDtos);

    val result = mockMvc.perform(get(BASE_URL))
        .andExpect(status().isOk())
        .andReturn();

    val content = result.getResponse().getContentAsString();
    val userDtos = objectMapper.readValue(content, new TypeReference<List<UserDto>>() {
    });

    assertEquals(expectedUserDtos, userDtos);
  }

  @Test
  void getUsers_filterByEmail() throws Exception {
    val userDto = new UserDto(1, "Alice", "alice@example.com", role, true, LocalDate.now());
    List<UserDto> expectedUserDtos = List.of(userDto);

    when(userService.getUsers("alice@example.com", true)).thenReturn(expectedUserDtos);

    val result = mockMvc.perform(get(BASE_URL)
            .param("email", "alice@example.com"))
        .andExpect(status().isOk())
        .andReturn();

    val content = result.getResponse().getContentAsString();
    val userDtos = objectMapper.readValue(content, new TypeReference<List<UserDto>>() {
    });

    assertEquals(expectedUserDtos, userDtos);
  }

  @Test
  void getUsers_sortDescending() throws Exception {
    val userDto1 = new UserDto(1, "Alice", "alice@example.com", role, true, LocalDate.now());
    val userDto2 = new UserDto(2, "Bob", "bob@example.com", 1, true, LocalDate.now());
    val userDto3 = new UserDto(3, "Charlie", "charlie@example.com", role, true, LocalDate.now());

    List<UserDto> expectedUserDtos = List.of(userDto3, userDto2, userDto1);

    when(userService.getUsers(null, false)).thenReturn(expectedUserDtos);

    val result = mockMvc.perform(get(BASE_URL)
            .param("ascending", "false"))
        .andExpect(status().isOk())
        .andReturn();

    val content = result.getResponse().getContentAsString();
    val userDtos = objectMapper.readValue(content, new TypeReference<List<UserDto>>() {
    });

    assertEquals(expectedUserDtos, userDtos);
  }
}