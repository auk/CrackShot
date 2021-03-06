package stx.shooterstatistic.model;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
public class TrainingElement extends AbstractEntity  {

  private String name;

  private TrainingElement() {}

  public TrainingElement(@NotNull String name) {
    this.name = Objects.requireNonNull(name);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
