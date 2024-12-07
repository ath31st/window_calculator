package sidim.doma.wc.util;

import java.util.Arrays;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import sidim.doma.wc.exception.UserRoleException;

public enum Role {
  ADMIN(1),
  USER(2);

  public final Integer value;

  Role(Integer value) {
    this.value = value;
  }

  public static Role getRoleByValue(Integer value) {
    return Arrays.stream(Role.values())
        .filter(r -> Objects.equals(r.value, value))
        .findFirst()
        .orElseThrow(
            () -> new UserRoleException("Role with value: " + value + " not found",
                HttpStatus.BAD_REQUEST));
  }
}
