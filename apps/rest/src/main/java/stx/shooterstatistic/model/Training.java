package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Training extends AbstractEntity {

  @ManyToOne
  private Organization organization;

  LocalDate date;

  LocalTime time;

  @OneToMany(mappedBy = "training")
  @JsonIgnoreProperties("training")
  List<TrainingParticipant> participants = new ArrayList<>();

  @ElementCollection
  List<String> trainingElements = new ArrayList<>();

  @OneToMany(mappedBy = "training")
  @JsonIgnoreProperties("training")
  List<Stage> stages = new ArrayList<>();

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

  public List<Stage> getStages() {
    return stages;
  }

  public void setStages(List<Stage> stages) {
    this.stages = stages;
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, id: ''{1}'', date: ''{2}'', super: {3} '}'",
       getClass().getName(), getId(), getDate(), super.toString());
  }
}
