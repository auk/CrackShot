package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Stage extends AbstractEntity {

  @ManyToOne
  @JsonIgnoreProperties("stages")
  Training training;

  @ElementCollection
  List<String> trainingElements = new ArrayList<>();

  @Column(columnDefinition = "integer default 0")
  int shots;

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

  public int getShots() {
    return shots;
  }

  public void setShots(int shots) {
    this.shots = shots;
  }
}
