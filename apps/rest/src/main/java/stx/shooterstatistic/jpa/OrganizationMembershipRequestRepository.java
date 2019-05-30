package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.OrganizationMembershipRequest;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;

@RepositoryRestResource(exported = false)
public interface OrganizationMembershipRequestRepository extends JpaRepository<OrganizationMembershipRequest, String> {
  Page<OrganizationMembershipRequest> findByOrganization(@NotNull Organization organization, Pageable pageable);
  Page<OrganizationMembershipRequest> findByUser(@NotNull User user, Pageable pageable);
  Page<OrganizationMembershipRequest> findByOrganizationAndUser(@NotNull Organization organization, @NotNull User user, Pageable pageable);
}
