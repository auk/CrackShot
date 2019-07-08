package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Entity
public class Training extends AbstractEntity {

  @ManyToOne
  private Organization organization;

  LocalDate date;

  LocalTime time;

  @OneToMany(mappedBy = "training")
  @JsonIgnore
  List<TrainingParticipant> participants = new ArrayList<>();

  @ElementCollection
  List<String> trainingElements = new ArrayList<>();

  public Training() {} // jpa

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

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public LocalTime getTime() {
    return time;
  }

  public void setTime(LocalTime time) {
    this.time = time;
  }

  public Organization getOrganization() {
    return organization;
  }

  public void setOrganization(Organization organization) {
    this.organization = organization;
  }

  public List<TrainingParticipant> getParticipants() {
    return participants;
  }

  public void setParticipants(List<TrainingParticipant> participants) {
    this.participants = participants;
  }

  public List<String> getTrainingElements() {
    return trainingElements;
  }

  public void setTrainingElements(List<String> trainingElements) {
    this.trainingElements = trainingElements;
  }

  @JsonProperty(value = "users")
  public List<User> getParticipantUsers() {
    if (participants == null)
      return Collections.emptyList();
    return participants.stream().map(TrainingParticipant::getUser).collect(Collectors.toList());
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, id: ''{1}'', date: ''{2}'', super: {3} '}'",
       getClass().getName(), getId(), getDate(), super.toString());
  }
}
