package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.jpa.UserMembershipRepository;
import stx.shooterstatistic.model.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class OrganizationMembershipService {

  @Autowired
  SecurityService securityService;

  @Autowired
  UserMembershipRepository userMembershipRepository;

  public OrganizationMembership register(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user, boolean isAsmin) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);
    Objects.requireNonNull(user);

    securityService.checkHasAccess(context, organization, Permission.WRITE);

    Optional<OrganizationMembership> opUserMembership = userMembershipRepository.findByOrganizationAndUser(organization, user);
    if (opUserMembership.isPresent()) {
      OrganizationMembership organizationMembership = opUserMembership.get();
      // auk: TODO
      return organizationMembership;
    }
    return userMembershipRepository.save(new OrganizationMembership(organization, user, isAsmin));
  }

  public boolean isMember(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    Objects.requireNonNull(organization);
    securityService.checkHasAccess(context, organization, Permission.READ);
    return userMembershipRepository.findByOrganizationAndUser(organization, user).isPresent();
  }

  public Page<OrganizationMembership> getMembers(@NotNull SecurityContext context, @NotNull Organization organization, Pageable pageable) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);
    securityService.checkHasAccess(context, organization, Permission.READ);
    return userMembershipRepository.findByOrganization(organization, pageable);
  }

  public void unregister(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);
    Objects.requireNonNull(user);

    securityService.checkHasAccess(context, organization, Permission.WRITE);
    userMembershipRepository.deleteByOrganizationAndUser(organization, user);
  }

  public void unregisterAll(@NotNull SecurityContext context, @NotNull Organization organization) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(organization);

    securityService.checkHasAccess(context, organization, Permission.WRITE);
    userMembershipRepository.deleteByOrganization(organization);
  }
}