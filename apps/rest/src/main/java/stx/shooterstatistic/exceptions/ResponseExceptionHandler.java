package stx.shooterstatistic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import stx.shooterstatistic.exceptions.ResponseException;
import stx.shooterstatistic.model.SecurityContext;

@RestControllerAdvice
public class ResponseExceptionHandler {

  @ExceptionHandler(value = {HttpRequestMethodNotSupportedException.class })
  public ResponseEntity<ResponseException> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex, WebRequest req) {
    HttpStatus status = HttpStatus.METHOD_NOT_ALLOWED;
    return ResponseEntity.status(status).body(ResponseExceptionComposer.compose(status, ex, req));
  }

  @ExceptionHandler(value = {SecurityException.class })
  public ResponseEntity<ResponseException> handleSecurityException(SecurityException ex, WebRequest req) {
    HttpStatus status = HttpStatus.FORBIDDEN;
    return ResponseEntity.status(status).body(ResponseExceptionComposer.compose(status, ex, req));
  }

  @ExceptionHandler(value = { Exception.class })
  public ResponseEntity<ResponseException> handleException(Exception ex, WebRequest req) {
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    return ResponseEntity.status(status).body(ResponseExceptionComposer.compose(status, ex, req));
  }
}
