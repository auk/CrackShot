package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class UserMembership extends AbstractEntity {
  @ManyToOne
  Organization organization;

  @ManyToOne
  User user;

  LocalDate registerDate;

  boolean isAdmin;

  public UserMembership(Organization organization, User user, boolean isAdmin) {
    this.organization = Objects.requireNonNull(organization);
    this.user = Objects.requireNonNull(user);
    this.isAdmin = isAdmin;
  }

  public LocalDate getRegisterDate() {
    return registerDate;
  }

  public void setRegisterDate(LocalDate registerDate) {
    this.registerDate = registerDate;
  }
}
