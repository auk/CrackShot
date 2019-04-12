package stx.shooterstatistic.model;

import stx.shooterstatistic.enums.Result;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Entity
public class StageResult extends AbstractEntity {

  @ElementCollection
  private Map<Result, Integer> scores = new HashMap<>();

  private Duration duration;

  public Map<Result, Integer> getScores() {
    return scores;
  }

  public Duration getDuration() {
    return duration;
  }

  public void setScore(@NotNull Result score, int count) {
    scores.putIfAbsent(score, count);
  }

  public void setDuration(@NotNull double duration) {
    this.duration = Duration.ofMillis((long)(duration * 1000));
  }
}
