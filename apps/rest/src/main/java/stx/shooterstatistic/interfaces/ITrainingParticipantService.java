package stx.shooterstatistic.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.*;

import javax.validation.constraints.NotNull;
import java.util.Optional;

public interface ITrainingParticipantService {
  Optional<TrainingParticipant> findTrainingParticipants(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user);
  Page<TrainingParticipant> findTrainingParticipants(SecurityContext context, TrainingParticipantSearchCriteria searchCriteria, Pageable pageable);
  TrainingParticipant save(@NotNull SecurityContext context, @NotNull TrainingParticipant trainingParticipant);
}
