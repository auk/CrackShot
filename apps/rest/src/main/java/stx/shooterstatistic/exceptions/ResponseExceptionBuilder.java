package stx.shooterstatistic.exceptions;

import org.springframework.http.HttpStatus;
import stx.shooterstatistic.exceptions.ResponseException;

import javax.validation.constraints.NotNull;
import java.util.Objects;

public class ResponseExceptionBuilder {

  ResponseException response;

  public ResponseExceptionBuilder(@NotNull  HttpStatus status) {
    Objects.requireNonNull(status);
    this.response = new ResponseException(status);
  }

  @NotNull
  public static ResponseExceptionBuilder create(@NotNull  HttpStatus status) {
    Objects.requireNonNull(status);
    return new ResponseExceptionBuilder(status);
  }

  @NotNull
  ResponseExceptionBuilder withDetails(String message) {
    response.setDetails(message);
    return this;
  }

  @NotNull
  ResponseExceptionBuilder withMessage(String message) {
    response.setMessage(message);
    return this;
  }

  @NotNull
  ResponseExceptionBuilder withPath(String path) {
    response.setPath(path);
    return this;
  }

  @NotNull
  ResponseException build() {
    return response;
  }
}
