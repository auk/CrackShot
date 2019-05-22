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
  String web;
  String email;
  String phone;
  String address;

  @OneToMany
  List<OrganizationMembership> organizationMemberships;

  @OneToMany(mappedBy = "organizationId", fetch = FetchType.LAZY)
  @JsonIgnore
  private Collection<Training> trainings = new ArrayList<>(0);

  private Organization() {
  }

  public Organization(String owner, String name) {
    this.owner = Objects.requireNonNull(owner);
    this.name = Objects.requireNonNull(name);
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getOwner() {
    return owner;
  }

  public void setOwner(String owner) {
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

  public Collection<Training> getTrainings() {
    return trainings;
  }

  public void setTrainings(Collection<Training> trainings) {
    this.trainings = trainings;
  }

  public List<OrganizationMembership> getOrganizationMemberships() {
    return organizationMemberships;
  }

  public void setOrganizationMemberships(List<OrganizationMembership> organizationMemberships) {
    this.organizationMemberships = organizationMemberships;
  }
}
