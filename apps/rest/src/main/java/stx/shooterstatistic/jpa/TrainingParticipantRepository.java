package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingParticipant;
import stx.shooterstatistic.model.User;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface TrainingParticipantRepository extends JpaRepository<TrainingParticipant, String> {
  Page<TrainingParticipant> findByOrganization(Organization organization, Pageable pageable);
  Page<TrainingParticipant> findByTraining(Training training, Pageable pageable);
  Page<TrainingParticipant> findByUser(User user, Pageable pageable);
  Optional<TrainingParticipant> findByTrainingAndUser(Training training, User user);
}
