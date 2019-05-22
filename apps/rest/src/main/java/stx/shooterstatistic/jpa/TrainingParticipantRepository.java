package stx.shooterstatistic.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingParticipant;
import stx.shooterstatistic.model.User;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface TrainingParticipantRepository extends JpaRepository<TrainingParticipant, String> {
  boolean existsByTrainingAndUser(Training training, User user);
  Optional<TrainingParticipant> findByTrainingAndUser(Training training, User user);
}
