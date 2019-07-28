package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Stage;
import stx.shooterstatistic.model.Training;

import javax.validation.constraints.NotNull;

@RepositoryRestResource(exported = false)
public interface TrainingStageRepository extends JpaRepository<Stage, String> {
  Page<Stage> findByTraining(@NotNull Training training, @NotNull Pageable pageable);
}
