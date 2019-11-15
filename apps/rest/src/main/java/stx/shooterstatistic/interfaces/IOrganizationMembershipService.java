package stx.shooterstatistic.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.OrganizationMembership;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import java.util.Optional;

public interface IOrganizationMembershipService {
  OrganizationMembership registerMember(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user, boolean isAsmin);
  boolean isAdmin(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user);
  boolean isMember(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user);
  Page<OrganizationMembership> getOrganizationMembers(@NotNull SecurityContext context, @NotNull Organization organization, Pageable pageable);
  Page<OrganizationMembership> getUserOrganizations(@NotNull SecurityContext context, @NotNull User user, Pageable pageable);
  Optional<OrganizationMembership> findMembership(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user);
  OrganizationMembership getMembership(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user);
  void unregisterMember(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user);
  void unregisterAll(@NotNull SecurityContext context, @NotNull Organization organization);
}
