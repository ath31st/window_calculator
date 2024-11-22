package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BlockTableServiceException extends AbstractException {
  public BlockTableServiceException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
