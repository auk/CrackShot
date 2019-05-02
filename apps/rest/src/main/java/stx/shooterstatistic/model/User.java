package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity {

  String username;

  String email;

  String name;

  String phone;

  protected User() {
  }

  public User(@NotNull String username) {
    Objects.requireNonNull(username);
    this.username = username;
  }

  @OneToMany
  List<UserMembership> userMemberships;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<UserMembership> getUserMemberships() {
    return userMemberships;
  }

  public void setUserMemberships(List<UserMembership> userMemberships) {
    this.userMemberships = userMemberships;
  }
}