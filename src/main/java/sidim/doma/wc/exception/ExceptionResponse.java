package sidim.doma.wc.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Builder
@Getter
public class ExceptionResponse {
  String timestamp;
  HttpStatus status;
  String error;
}