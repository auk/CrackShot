package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.OrganizationMembershipRepository;
import stx.shooterstatistic.model.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class OrganizationMembershipService {

  @Autowired
  SecurityService securityService;

  @Autowired
  OrganizationMembershipRepository organizationMembershipRepository;

  public OrganizationMembership register(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user, boolean isAsmin) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);
    Objects.requireNonNull(user);

    securityService.checkHasAccess(context, organization, Permission.WRITE);

    Optional<OrganizationMembership> opUserMembership = organizationMembershipRepository.findByOrganizationAndUser(organization, user);
    if (opUserMembership.isPresent()) {
      OrganizationMembership organizationMembership = opUserMembership.get();
      // auk: TODO
      return organizationMembership;
    }
    return organizationMembershipRepository.save(new OrganizationMembership(organization, user, isAsmin));
  }

  public boolean isAdmin(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    Objects.requireNonNull(organization);
    Optional<OrganizationMembership> opMembership = findMembership(context, organization, user);
    return opMembership.isPresent() && opMembership.get().isAdmin();
  }

  public boolean isMember(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    Objects.requireNonNull(organization);
    return findMembership(context, organization, user).isPresent();
  }

  public Page<OrganizationMembership> getOrganizationMembers(@NotNull SecurityContext context, @NotNull Organization organization, Pageable pageable) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);
    securityService.checkHasAccess(context, organization, Permission.READ);
    return organizationMembershipRepository.findByOrganization(organization, pageable);
  }

  public Page<OrganizationMembership> getUserOrganizations(@NotNull SecurityContext context, @NotNull User user, Pageable pageable) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(user);
    return organizationMembershipRepository.findByUser(user, pageable);
  }

  @NotNull
  public Optional<OrganizationMembership> findMembership(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    securityService.checkHasAccess(context, organization, Permission.READ);
    return organizationMembershipRepository.findByOrganizationAndUser(organization, user);
  }

  @NotNull
  public OrganizationMembership getMembership(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    return findMembership(context, organization, user).orElseThrow(() -> new ResourceNotFoundException("Membership"));
  }

  public void unregister(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);
    Objects.requireNonNull(user);

    securityService.checkHasAccess(context, organization, Permission.WRITE);
    organizationMembershipRepository.deleteByOrganizationAndUser(organization, user);
  }

  public void unregisterAll(@NotNull SecurityContext context, @NotNull Organization organization) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);

    securityService.checkHasAccess(context, organization, Permission.WRITE);
    organizationMembershipRepository.deleteByOrganization(organization);
  }
}
