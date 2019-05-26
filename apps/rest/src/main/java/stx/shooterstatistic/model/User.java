package stx.shooterstatistic.model;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity {

  private String username;

  private String email;

  private String name;

  private String phone;

  private String source;

  @ElementCollection(fetch = FetchType.EAGER)
  private List<String> roles;

  protected User() {
  }

  public User(@NotNull String username) {
    Objects.requireNonNull(username);
    this.username = username;
  }

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

  public List<String> getRoles() {
    return roles;
  }

  public void setRoles(List<String> roles) {
    this.roles = roles;
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

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, id: ''{1}'', username: ''{2}'', email: ''{3}'', name: ''{4}'', super: {5} '}'",
      getClass().getName(), getId(), getUsername(), getEmail(), getName(), super.toString());
  }
}
