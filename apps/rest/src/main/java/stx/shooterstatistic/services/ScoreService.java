package stx.shooterstatistic.services;

import org.springframework.stereotype.Service;
import stx.shooterstatistic.enums.PowerFactor;
import stx.shooterstatistic.enums.Result;
import stx.shooterstatistic.exceptions.IPSCException;
import stx.shooterstatistic.interfaces.IResultScore;
import stx.shooterstatistic.model.StageResult;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class ScoreService {
  static class IPSCResultScore implements IResultScore {

    Map<Result, Integer> scores;

    IPSCResultScore(@NotNull Map<Result, Integer> scores) {
      this.scores = Objects.requireNonNull(scores);
    }

    @Override
    public int getScore(@NotNull Result result) {
      Objects.requireNonNull(result);

      if (!scores.containsKey(result))
        throw new IPSCException("Unsupported result score " + result);

      return this.scores.get(result);
    }
  }

  private static Map<Result, Integer> SCORES_MINOR = new HashMap<Result, Integer>() {{
    put(Result.A, 5);
    put(Result.C, 3);
    put(Result.D, 1);
    put(Result.MISS, -10);
    put(Result.NO_SHOOT, -10);
    put(Result.PENALTY, -10);
  }};

  private static Map<Result, Integer> SCORES_MAJOR = new HashMap<Result, Integer>() {{
    put(Result.A, 5);
    put(Result.C, 4);
    put(Result.D, 2);
    put(Result.MISS, -10);
    put(Result.NO_SHOOT, -10);
    put(Result.PENALTY, -10);
  }};

  Map<PowerFactor, IResultScore> scores = new HashMap<PowerFactor, IResultScore>() {{
    put(PowerFactor.MINOR, new IPSCResultScore(SCORES_MINOR));
    put(PowerFactor.MAJOR, new IPSCResultScore(SCORES_MAJOR));
  }};

  public int calculateScore(@NotNull PowerFactor powerFactor, @NotNull Result result, int count) {
    if (count < 0)
      throw new IllegalArgumentException("Count must be greater or equal to zero.");

    if (!scores.containsKey(powerFactor))
      throw new IPSCException("Unsupported power factor " + powerFactor);

    IResultScore resultScore = scores.get(powerFactor);
    return resultScore.getScore(result) * count;
  }

  public int calculateScore(@NotNull PowerFactor powerFactor, @NotNull StageResult stageResult) {
    int result = 0;
    for (Map.Entry<Result, Integer> e : stageResult.getScores().entrySet()) {
      result += calculateScore(powerFactor, e.getKey(), e.getValue());
    }
    return Math.max(result, 0);
  }

  public BigDecimal calculateHitFactor(@NotNull PowerFactor powerFactor, @NotNull StageResult stageResult) {
    if (stageResult.getDuration() == null || stageResult.getDuration().isZero())
      return BigDecimal.valueOf(0, 3);
    int score = calculateScore(powerFactor, stageResult);
    Duration duration = stageResult.getDuration();
    double value = (double) score / duration.toMillis() * 1000.;
    return createHitFactor(value);
  }

  private BigDecimal createHitFactor(double value) {
    BigDecimal result = BigDecimal.valueOf(value);
    return result.setScale(3, 4);
  }
}
