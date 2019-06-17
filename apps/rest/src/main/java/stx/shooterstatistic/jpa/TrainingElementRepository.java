package stx.shooterstatistic.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.TrainingElement;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface TrainingElementRepository extends JpaRepository<TrainingElement, String> {
  Optional<TrainingElement> findByName(@NotNull String name);
}
