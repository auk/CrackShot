package stx.shooterstatistic.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class UserTrainings extends AbstractEntity {

  @Column(name = "TRAINING_ID")
  private String trainingId;

  @Column(name = "USER_ID")
  private String userId;

  Integer shots;

  BigDecimal cost;
}
