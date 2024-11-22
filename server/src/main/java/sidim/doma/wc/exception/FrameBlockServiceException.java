package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class FrameBlockServiceException extends AbstractException {
  public FrameBlockServiceException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
