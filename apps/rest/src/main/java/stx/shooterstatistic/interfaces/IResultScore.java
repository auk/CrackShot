package stx.shooterstatistic.interfaces;

import stx.shooterstatistic.enums.Result;

import javax.validation.constraints.NotNull;

public interface IResultScore {
  int getScore(@NotNull Result result);
}
