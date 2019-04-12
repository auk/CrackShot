package stx.shooterstatistic.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Organization;

@RepositoryRestResource(exported = false)
public interface OrganizationRepository extends JpaRepository<Organization, String> {
}
