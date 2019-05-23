package stx.shooterstatistic.model;

import stx.shooterstatistic.util.Definable;

import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class TrainingSearchCriteria {
  Definable<String> organization = Definable.undefined();
  LocalDate dateFrom, dateTo;
  List<String> users;

  @NotNull
  public Definable<String> getOrganization() {
    return organization;
  }

  public void setOrganization(@NotNull Definable<String> organization) {
    this.organization = Objects.requireNonNull(organization);
  }

  public LocalDate getDateFrom() {
    return dateFrom;
  }

  public void setDateFrom(LocalDate dateFrom) {
    this.dateFrom = dateFrom;
  }

  public LocalDate getDateTo() {
    return dateTo;
  }

  public void setDateTo(LocalDate dateTo) {
    this.dateTo = dateTo;
  }

  public List<String> getUsers() {
    return users;
  }

  public void setUsers(List<String> users) {
    this.users = users;
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, organization: ''{1}'', date from: ''{2}'', date to: ''{3}'', super: {4} '}'",
       getClass().getName(), organization, dateFrom, dateTo, super.toString());

  }
}
