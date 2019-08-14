package stx.shooterstatistic.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.TrainingStageRepository;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.services.StageService;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StageServiceImpl implements StageService {
  @Autowired
  TrainingStageRepository trainingStageRepository;

  @Override
  public @NotNull Stage createStage(@NotNull SecurityContext context, @NotNull Training training, @Null List<TrainingElement> trainingElements, int shots) {
    Stage stage = new Stage(training);
    if (trainingElements != null)
      stage.setTrainingElements(trainingElements.stream().map(AbstractEntity::getId).collect(Collectors.toList()));
    stage.setShots(shots);
    return trainingStageRepository.save(stage);
  }

  @Override
  public @NotNull void deleteStage(@NotNull SecurityContext context, @NotNull Stage stage) {
    Objects.requireNonNull(stage);
    trainingStageRepository.delete(stage);
  }

  @Override
  public Optional<Stage> findStageById(@NotNull SecurityContext context, @NotNull String id) {
    return trainingStageRepository.findById(id);
  }

  @Override
  public @NotNull Page<Stage> findStages(@NotNull SecurityContext context, @NotNull Training training, Pageable pageable) {
    return trainingStageRepository.findByTraining(training, pageable);
  }

  @Override
  public Stage getStage(@NotNull SecurityContext context, @NotNull String id) {
    return findStageById(context, id).orElseThrow(() -> new ResourceNotFoundException("Training stage", id));
  }

  @Override
  public @NotNull Stage saveStage(@NotNull SecurityContext context, @NotNull Stage stage) {
    return trainingStageRepository.save(stage);
  }
}
