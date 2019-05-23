package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Training extends AbstractEntity {

  @ManyToOne
  private Organization organization;

  LocalDate date;

  private Training() {} // jpa

  public Training(@NotNull LocalDate date) {
    this.date = Objects.requireNonNull(date);
  }

  public Training(@NotNull LocalDate date, Organization organization) {
    this.date = Objects.requireNonNull(date);
    this.organization = organization;
  }

  public LocalDate getDate() {
    return date;
  }

  public Organization getOrganization() {
    return organization;
  }

  public void setOrganization(Organization organization) {
    this.organization = organization;
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, id: ''{1}'', date: ''{2}'', organization: ''{3}'', super: {4} '}'",
       getClass().getName(), getId(), getDate(), getOrganization(), super.toString());
  }
}
