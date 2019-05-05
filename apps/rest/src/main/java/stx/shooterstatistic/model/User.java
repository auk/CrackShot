package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity {

  private String username;

  private String email;

  private String name;

  private String phone;

  private String source;

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

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public List<UserMembership> getUserMemberships() {
    return userMemberships;
  }

  public void setUserMemberships(List<UserMembership> userMemberships) {
    this.userMemberships = userMemberships;
  }
}
