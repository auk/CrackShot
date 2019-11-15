package stx.shooterstatistic.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.TrainingElement;

import javax.validation.constraints.NotNull;
import java.util.Optional;

public interface ITrainingElementService {
  Page<TrainingElement> all(@NotNull Pageable pageable);
  TrainingElement create(@NotNull SecurityContext context, @NotNull String name);
  void delete(@NotNull SecurityContext context, @NotNull String id);
  Optional<TrainingElement> find(@NotNull String id);
  @NotNull TrainingElement get(@NotNull String id);
  TrainingElement save(@NotNull SecurityContext context, @NotNull TrainingElement trainingElement);
}
