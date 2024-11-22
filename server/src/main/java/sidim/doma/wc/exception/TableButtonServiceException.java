package sidim.doma.wc.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class TableButtonServiceException extends AbstractException {
  public TableButtonServiceException(String errorMessage, HttpStatus status) {
    super(errorMessage, status);
  }
}
