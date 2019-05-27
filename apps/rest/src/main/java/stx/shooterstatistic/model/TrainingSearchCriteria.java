package stx.shooterstatistic.model;

import stx.shooterstatistic.util.Definable;

import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class TrainingSearchCriteria {
  Definable<String> organization = Definable.undefined();
  LocalDate dateFrom, dateTo;
  List<String> users = new ArrayList<>();

  public TrainingSearchCriteria() {
  }

  public TrainingSearchCriteria(TrainingSearchCriteria criteria) {
    if (criteria != null) {
      this.organization = criteria.getOrganization();
      this.dateFrom = criteria.getDateFrom();
      this.dateTo = criteria.getDateTo();
      users = criteria.getUsers() == null ? new ArrayList<>() : new ArrayList<>(criteria.getUsers());
    }
  }

  @NotNull
  public Definable<String> getOrganization() {
    return organization;
  }

  public TrainingSearchCriteria setOrganization(@NotNull Definable<String> organization) {
    this.organization = Objects.requireNonNull(organization);
    return this;
  }

  public LocalDate getDateFrom() {
    return dateFrom;
  }

  public TrainingSearchCriteria setDateFrom(LocalDate dateFrom) {
    this.dateFrom = dateFrom;
    return this;
  }

  public LocalDate getDateTo() {
    return dateTo;
  }

  public TrainingSearchCriteria setDateTo(LocalDate dateTo) {
    this.dateTo = dateTo;
    return this;
  }

  public List<String> getUsers() {
    return users;
  }

  public TrainingSearchCriteria setUsers(List<String> users) {
    this.users = users;
    return this;
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, organization: ''{1}'', date from: ''{2}'', date to: ''{3}'', super: {4} '}'",
       getClass().getName(), organization, dateFrom, dateTo, super.toString());

  }
}
