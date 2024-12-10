package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomJwtVerificationException extends AbstractException {
  public CustomJwtVerificationException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
