package stx.shooterstatistic.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.Stage;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingElement;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

public interface StageService {
  @NotNull Stage createStage(@NotNull SecurityContext context, @NotNull Training training, @Null List<TrainingElement> trainingElements, int shots);
  @NotNull void deleteStage(@NotNull SecurityContext context, @NotNull Stage stage);
  Optional<Stage> findStageById(@NotNull SecurityContext context, @NotNull String id);
  @NotNull Page<Stage> findStages(@NotNull SecurityContext context, @NotNull Training training, Pageable pageable);
  Stage getStage(@NotNull SecurityContext context, @NotNull String id);
  @NotNull Stage saveStage(@NotNull SecurityContext context, @NotNull Stage stage);
}
