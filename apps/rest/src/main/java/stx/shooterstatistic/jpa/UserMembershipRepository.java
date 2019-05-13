package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.model.UserMembership;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface UserMembershipRepository extends JpaRepository<UserMembership, String> {
  void deleteByOrganization(Organization organization);
  void deleteByOrganizationAndUser(Organization organization, User user);
  Page<UserMembership> findByOrganization(Organization organization, Pageable pageable);
  Page<UserMembership> findByUser(User user, Pageable pageable);
  Optional<UserMembership> findByOrganizationAndUser(Organization organization, User user);
}
