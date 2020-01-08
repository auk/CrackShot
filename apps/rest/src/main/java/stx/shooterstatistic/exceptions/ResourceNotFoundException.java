package stx.shooterstatistic.exceptions;

import org.springframework.hateoas.mediatype.vnderrors.VndErrors;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.text.MessageFormat;

public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String id) {
    super(MessageFormat.format("Resource with id=''{0}'' was not found.", id));
  }
  public ResourceNotFoundException(String type, String id) {
    super(MessageFormat.format("{0} with id=''{1}'' was not found.", type, id));
  }
  public ResourceNotFoundException() {
    super("Resource was not found");
  }
}

@ControllerAdvice
class ResourceNotFoundControllerAdvice {
  @ResponseBody
  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  VndErrors resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
    return new VndErrors("error", ex.getMessage());
  }
}