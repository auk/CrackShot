package stx.shooterstatistic.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.*;

import javax.validation.constraints.NotNull;
import java.security.Principal;

public interface IOrganizationService {
  Organization createOrganization(Principal principal, String name);
  Organization createOrganization(User user, String name);
  void deleteOrganization(SecurityContext context, Organization organization);
  Organization getOrganization(SecurityContext context, String id);
  Page<Organization> getOrganizations(SecurityContext context, OrganizationSearchCriteria criteria, Pageable pageable);
  boolean isOwner(SecurityContext context, Organization organization, User user);
  Organization save(SecurityContext context, Organization org);
  Page<OrganizationMembershipInvitation> searchInvitations(@NotNull SecurityContext context, Organization organization, User user, @NotNull Pageable pageable);
  Page<OrganizationMembershipRequest> searchRequests(@NotNull SecurityContext context, Organization organization, User user, @NotNull Pageable pageable);
}
