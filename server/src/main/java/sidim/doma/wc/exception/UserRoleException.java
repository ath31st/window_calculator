package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UserRoleException extends AbstractException {
  public UserRoleException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
