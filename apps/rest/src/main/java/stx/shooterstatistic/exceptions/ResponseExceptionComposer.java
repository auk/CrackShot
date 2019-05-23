package stx.shooterstatistic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import stx.shooterstatistic.exceptions.ResponseException;
import stx.shooterstatistic.exceptions.ResponseExceptionBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.io.PrintWriter;
import java.io.StringWriter;

public final class ResponseExceptionComposer {
  private ResponseExceptionComposer() {}

  public static ResponseException compose(@NotNull HttpStatus status, @NotNull Exception ex, @NotNull WebRequest webRequest) {
    HttpServletRequest servletRequest = ((ServletWebRequest)webRequest).getRequest();

    StringWriter sw = new StringWriter();
    ex.printStackTrace(new PrintWriter(sw));

    return ResponseExceptionBuilder
      .create(status)
      .withPath(servletRequest.getRequestURI())
      .withMessage(ex.getMessage())
      .withDetails(sw.toString())
      .build();
  }
}
