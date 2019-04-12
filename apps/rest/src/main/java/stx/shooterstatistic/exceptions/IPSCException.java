package stx.shooterstatistic.exceptions;

public class IPSCException extends RuntimeException {
  public IPSCException() {
    super();
  }
  public IPSCException(String message) {
    super(message);
  }
  public IPSCException(String message, Throwable throwable) {
    super(message, throwable);
  }
}
