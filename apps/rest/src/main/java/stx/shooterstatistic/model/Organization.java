package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
public class Organization extends AbstractEntity {
  String owner; // user id
  String name;

  @OneToMany
  List<UserMembership> userMemberships;

  @OneToMany(mappedBy = "organizationId", fetch = FetchType.LAZY)
  @JsonIgnore
  private Collection<Training> trainings = new ArrayList<>(0);

  private Organization() {
  }

  public Organization(String owner, String name) {
    this.owner = Objects.requireNonNull(owner);
    this.name = Objects.requireNonNull(name);
  }

  public List<UserMembership> getUserMemberships() {
    return userMemberships;
  }

  public void setUserMemberships(List<UserMembership> userMemberships) {
    this.userMemberships = userMemberships;
  }
}
