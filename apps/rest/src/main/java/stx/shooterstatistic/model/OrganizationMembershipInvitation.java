package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class OrganizationMembershipInvitation extends AbstractEntity {
  @ManyToOne
  User user;

  @ManyToOne
  Organization organization;

  LocalDateTime created;

  private OrganizationMembershipInvitation() {}

  public OrganizationMembershipInvitation(@NotNull Organization organization, @NotNull User user) {
    this.organization = Objects.requireNonNull(organization);
    this.user = Objects.requireNonNull(user);
    created = LocalDateTime.now();
  }
}
