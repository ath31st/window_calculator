package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class FrameServiceException extends AbstractException {
  public FrameServiceException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
