package stx.shooterstatistic.exceptions;

import org.springframework.http.HttpStatus;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

public class ResponseException {
  private LocalDateTime timestamp;
  private HttpStatus status;
  private String message;
  private String details;
  private String path;

  public ResponseException(@NotNull HttpStatus status) {
    this.status = Objects.requireNonNull(status);
    timestamp = LocalDateTime.now();
  }

  public ResponseException(@NotNull HttpStatus status, String message) {
    this(status);
    this.message = message;
  }

  @NotNull
  public String getError() {
    return status.getReasonPhrase();
  }

  @NotNull
  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String details) {
    this.details = details;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public Integer getStatus() {
    return status.value();
  }
}
