package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class OrganizationMembership extends AbstractEntity {
  @ManyToOne
  Organization organization;

  @ManyToOne
  User user;

  LocalDate registerDate;

  boolean admin;

  private OrganizationMembership() {

  }

  public OrganizationMembership(Organization organization, User user, boolean admin) {
    this.organization = Objects.requireNonNull(organization);
    this.user = Objects.requireNonNull(user);
    this.admin = admin;
  }

  public LocalDate getRegisterDate() {
    return registerDate;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setRegisterDate(LocalDate registerDate) {
    this.registerDate = registerDate;
  }
}
