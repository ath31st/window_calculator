package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RefreshTokenPayloadException extends AbstractException {
  public RefreshTokenPayloadException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
