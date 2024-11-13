package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class AbstractException extends RuntimeException {
  private final HttpStatus status;

  protected AbstractException(String errorMessage, HttpStatus status) {
    super(errorMessage);
    this.status = status;
  }
}
