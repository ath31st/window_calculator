package sidim.doma.wc.exception;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({
      FrameServiceException.class, FrameBlockServiceException.class,
      BlockTableServiceException.class, TableButtonServiceException.class,
      UserServiceException.class, UserRoleException.class, RefreshTokenPayloadException.class,
      LoginCredentialException.class, CustomJwtVerificationException.class})
  protected ResponseEntity<ExceptionResponse> handleException(AbstractException e) {
    return new ResponseEntity<>(buildResponse(e), e.getStatus());
  }

  @ExceptionHandler(JWTVerificationException.class)
  protected ResponseEntity<ExceptionResponse> handleJwtException(JWTVerificationException e) {
    ExceptionResponse response = ExceptionResponse.builder()
        .timestamp(LocalDateTime.now().toString())
        .error(e.getMessage())
        .status(HttpStatus.UNAUTHORIZED)
        .build();

    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(PropertyReferenceException.class)
  protected ResponseEntity<ExceptionResponse> handleException(PropertyReferenceException e) {

    ExceptionResponse response = ExceptionResponse.builder()
        .timestamp(LocalDateTime.now().toString())
        .error(e.getMessage())
        .status(HttpStatus.BAD_REQUEST)
        .build();

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  protected ResponseEntity<ExceptionResponse> handleValidException(ConstraintViolationException e) {

    String errorString = e.getConstraintViolations().stream()
        .map(ConstraintViolation::getMessage)
        .collect(Collectors.joining(", "));

    ExceptionResponse response = ExceptionResponse.builder()
        .timestamp(LocalDateTime.now().toString())
        .error(errorString)
        .status(HttpStatus.BAD_REQUEST)
        .build();
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                HttpHeaders headers,
                                                                HttpStatusCode status,
                                                                WebRequest request) {
    BindingResult bindingResult = ex.getBindingResult();
    String errorString = bindingResult.getAllErrors().stream()
        .map(DefaultMessageSourceResolvable::getDefaultMessage)
        .collect(Collectors.joining(", "));

    ExceptionResponse response = ExceptionResponse.builder()
        .timestamp(LocalDateTime.now().toString())
        .error(errorString)
        .status(HttpStatus.BAD_REQUEST)
        .build();

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  private ExceptionResponse buildResponse(AbstractException e) {
    return ExceptionResponse.builder()
        .timestamp(LocalDateTime.now().toString())
        .error(e.getMessage())
        .status(e.getStatus())
        .build();
  }
}
