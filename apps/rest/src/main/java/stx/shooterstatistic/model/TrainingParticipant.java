package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.text.MessageFormat;
import java.util.Objects;

@Entity
public class TrainingParticipant extends AbstractEntity {
  @ManyToOne
  Organization organization;

  @ManyToOne
  Training training;

  @ManyToOne
  User user;

  private TrainingParticipant() {} // for JPA

  public TrainingParticipant(@NotNull Training training, @NotNull User user) {
    this.organization = Objects.requireNonNull(training).getOrganization();
    this.training = Objects.requireNonNull(training);
    this.user = Objects.requireNonNull(user);
  }

  Organization getOrganization() {
    return organization;
  }

  public Training getTraining() {
    return training;
  }

  public User getUser() {
    return user;
  }

  @Override
  public String toString() {
    return MessageFormat.format("'{' class: {0}, id: ''{1}'', user: ''{2}'', training: ''{3}'', organization: ''{4}'', super: {5} '}'",
      getClass().getName(), getId(), getUser(), getTraining(), getOrganization(), super.toString());
  }
}
