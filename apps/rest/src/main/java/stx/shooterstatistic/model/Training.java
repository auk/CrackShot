package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Entity
public class Training extends AbstractEntity {

  @ManyToOne
  private Organization organization;

  LocalDate date;

  @JsonFormat(pattern="HH:mm")
  LocalTime time;

  @OneToMany(mappedBy = "training", cascade = CascadeType.REMOVE, orphanRemoval = true)
  @JsonIgnoreProperties("training")
  List<TrainingParticipant> participants = new ArrayList<>();

  @ElementCollection
  List<String> trainingElements = new ArrayList<>();

  @OneToMany(mappedBy = "training", cascade = CascadeType.REMOVE, orphanRemoval = true)
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
    return Collections.unmodifiableList(trainingElements);
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
