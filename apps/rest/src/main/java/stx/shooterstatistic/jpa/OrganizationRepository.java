package stx.shooterstatistic.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Organization;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface OrganizationRepository extends JpaRepository<Organization, String> {
  Optional<Organization> findByName(String name);
}
