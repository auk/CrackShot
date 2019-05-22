package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
public class TrainingParticipant extends AbstractEntity {
  @ManyToOne
  Training training;

  @ManyToOne
  User user;

  private TrainingParticipant() {} // for JPA

  public TrainingParticipant(@NotNull Training training, @NotNull User user) {
    this.training = Objects.requireNonNull(training);
    this.user = Objects.requireNonNull(user);
  }
}
