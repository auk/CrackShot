package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.User;

@RepositoryRestResource(exported = false)
public interface TrainingRepository extends JpaRepository<Training, String> {
  Page<Training> findByOrganization(Organization organization, Pageable pageable);
}
