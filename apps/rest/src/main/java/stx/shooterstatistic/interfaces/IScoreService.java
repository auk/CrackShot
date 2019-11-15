package stx.shooterstatistic.interfaces;

import stx.shooterstatistic.enums.PowerFactor;
import stx.shooterstatistic.enums.Result;
import stx.shooterstatistic.model.StageResult;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public interface IScoreService {
  int calculateScore(@NotNull PowerFactor powerFactor, @NotNull Result result, int count);
  int calculateScore(@NotNull PowerFactor powerFactor, @NotNull StageResult stageResult);
  BigDecimal calculateHitFactor(@NotNull PowerFactor powerFactor, @NotNull StageResult stageResult);
}
