package stx.shooterstatistic.model;

public class SecurityContext {
  private User user;

  public static SecurityContext create(User user) {
    return new SecurityContext(user);
  }

  public SecurityContext(User user) {
    this.user = user;
  }

  public User getUser() {
    return user;
  }
}
