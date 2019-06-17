package stx.shooterstatistic.model;

import javax.validation.constraints.NotNull;
import java.util.Objects;

public class SecurityContext {
  private User user;

  public static SecurityContext create(@NotNull User user) {
    return new SecurityContext(user);
  }

  public SecurityContext(@NotNull User user) {
    this.user = Objects.requireNonNull(user);
  }

  public User getUser() {
    return user;
  }
}
