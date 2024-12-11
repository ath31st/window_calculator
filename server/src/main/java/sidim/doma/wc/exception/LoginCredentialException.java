package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class LoginCredentialException extends AbstractException {
  public LoginCredentialException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
