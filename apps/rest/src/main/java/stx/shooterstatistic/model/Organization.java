package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

@Entity
public class Organization extends AbstractEntity {

  @ManyToOne
  User owner; // user id

  String name;
  String web;
  String email;
  String phone;
  String address;

  private Organization() {
  }

  public Organization(User owner, String name) {
    this.owner = Objects.requireNonNull(owner);
    this.name = Objects.requireNonNull(name);
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public User getOwner() {
    return owner;
  }

  public void setOwner(User owner) {
    this.owner = owner;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getWeb() {
    return web;
  }

  public void setWeb(String web) {
    this.web = web;
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, id: ''{1}'', name: ''{2}'', owner: ''{3}'', super: {4} '}'",
      getClass().getName(), getId(), getName(), getOwner(), super.toString());
  }
}
