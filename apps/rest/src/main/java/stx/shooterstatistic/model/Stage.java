package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Stage extends AbstractEntity {

  @ManyToOne
  @JsonIgnoreProperties("stages")
  Training training;

  @ElementCollection
  List<String> trainingElements = new ArrayList<>();

  private Stage() {} // JPA

  public Stage(Training training) {
    this.training = training;
  }

  public Training getTraining() {
    return training;
  }

  public void setTraining(Training training) {
    this.training = training;
  }

  public List<String> getTrainingElements() {
    return trainingElements;
  }

  public void setTrainingElements(List<String> trainingElements) {
    this.trainingElements = trainingElements;
  }
}
