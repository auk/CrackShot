package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceAlreadyExists;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.OrganizationRepository;
import stx.shooterstatistic.jpa.OrganizationSearchCriteria;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Permission;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Objects;

@Service
@Transactional
public class OrganizationService {
  @Autowired
  OrganizationRepository organizationRepository;

  @Autowired
  SecurityService securityService;

  @Autowired
  UserService userService;

  @Autowired
  OrganizationMembershipService organizationMembershipService;

  @NotNull
  public Organization createOrganization(Principal principal, String name) {
    Objects.requireNonNull(principal);
    Objects.requireNonNull(name);

    if (organizationRepository.findByName(name).isPresent())
      throw new ResourceAlreadyExists("Organization", name);

    User user = userService.findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
    return createOrganization(user, name);
  }

  @NotNull
  public Organization createOrganization(User user, String name) {
    Objects.requireNonNull(user);
    Objects.requireNonNull(name);

    Organization workspace = new Organization(user, name);
    workspace = organizationRepository.save(workspace);
    organizationMembershipService.register(SecurityContext.create(user), workspace, user, true);
    return workspace;
  }

  public Page<Organization> getOrganizations(SecurityContext context, OrganizationSearchCriteria criteris, Pageable pageable) {
    return organizationRepository.findAll(pageable);
  }

  public void deleteOrganization(SecurityContext context, String id) {
    Organization org = organizationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Organization", id));
    securityService.checkHasAccess(context, org, Permission.WRITE);
    organizationMembershipService.unregisterAll(context, org);
    organizationRepository.delete(org);
  }

  @NotNull
  public Organization getOrganization(SecurityContext context, String id) {
    Organization org = organizationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Organization", id));
    securityService.checkHasAccess(context, org, Permission.READ);
    return org;
  }

  @NotNull
  public Organization save(SecurityContext context, @NotNull Organization org) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(org);

    securityService.checkHasAccess(context, org, Permission.WRITE);
    return organizationRepository.save(org);
  }
}
