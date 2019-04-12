package stx.shooterstatistic.model;

import javax.persistence.Entity;

@Entity
public class Stage extends AbstractEntity {
  String trainingId;

  String getTrainingId() {
    return trainingId;
  }
}
