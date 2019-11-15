package stx.shooterstatistic.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ITrainingService {
  Training createTraining(
    @NotNull SecurityContext context,
    @NotNull LocalDate date,
    @NotNull LocalTime time,
    @Null Organization organization,
    @Null List<User> users,
    @NotNull List<TrainingElement> elements
  );
  void deleteTraining(@NotNull SecurityContext context, @NotNull Training training);
  Page<Training> findTrainings(@NotNull SecurityContext context, @NotNull TrainingSearchCriteria searchCriteria, @NotNull Pageable pageable);
  Optional<Training> findTraining(SecurityContext context, @NotNull String id);
  Training getTraining(@NotNull SecurityContext context, @NotNull String id);
  boolean isParticipated(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user);
  TrainingParticipant participate(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user);
  void leaveTraining(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user);
  Training mergeTrainingElement(@NotNull SecurityContext context, @NotNull Training training, @NotNull List<TrainingElement> elements);
  Training saveTraining(@NotNull SecurityContext context, @NotNull Training training);
}
