package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UserServiceException extends AbstractException {
  public UserServiceException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
