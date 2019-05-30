package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class OrganizationMembershipRequest extends AbstractEntity {
  @ManyToOne
  User user;

  @ManyToOne
  Organization organization;

  LocalDateTime created;

  private OrganizationMembershipRequest() {}

  public OrganizationMembershipRequest(@NotNull Organization organization, @NotNull User user) {
    this.organization = Objects.requireNonNull(organization);
    this.user = Objects.requireNonNull(user);
    created = LocalDateTime.now();
  }
}
