package stx.shooterstatistic.exceptions;

import org.springframework.hateoas.VndErrors;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.text.MessageFormat;

public class ResourceAlreadyExistsException extends RuntimeException {
  public ResourceAlreadyExistsException(String id) {
    super(MessageFormat.format("Resource with id=''{0}'' was not found.", id));
  }
  public ResourceAlreadyExistsException(String type, String id) {
    super(MessageFormat.format("{0} with id=''{1}'' was not found.", type, id));
  }
}

@ControllerAdvice
class ResourceAlreadyExistsControllerAdvice {
  @ResponseBody
  @ExceptionHandler(ResourceAlreadyExistsException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  VndErrors userAlreadyExistsExceptionHandler(ResourceAlreadyExistsException ex) {
    return new VndErrors("error", ex.getMessage());
  }
}