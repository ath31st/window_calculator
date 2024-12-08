package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.user.NewUserDto;
import sidim.doma.wc.dto.user.UpdateUserDto;
import sidim.doma.wc.dto.user.UserDto;
import sidim.doma.wc.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {
  private final UserService userService;

  @PostMapping("/users")
  public ResponseEntity<UserDto> createUser(@RequestBody @Valid NewUserDto dto) {
    val trimmedDto = NewUserDto.from(dto);
    val savedUser = userService.createNewUser(trimmedDto);

    return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
  }

  @PutMapping("/users")
  public ResponseEntity<UserDto> updateUser(@RequestBody @Valid UpdateUserDto dto) {
    val trimmedDto = UpdateUserDto.from(dto);
    val updatedUser = userService.updateUser(trimmedDto);

    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable Integer id) {
    userService.deleteUser(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
