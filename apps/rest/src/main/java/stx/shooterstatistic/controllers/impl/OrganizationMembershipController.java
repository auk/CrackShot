package stx.shooterstatistic.controllers.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import stx.shooterstatistic.rest.OrganizationMembershipApi;
import stx.shooterstatistic.jpa.OrganizationMembershipInvitationRepository;
import stx.shooterstatistic.jpa.OrganizationMembershipRequestRepository;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.services.OrganizationMembershipService;
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import java.security.Principal;
import java.util.Objects;

public class OrganizationMembershipController implements OrganizationMembershipApi {

  @Autowired
  private OrganizationService organizationService;

  @Autowired
  private OrganizationMembershipService organizationMembershipService;

  @Autowired
  private SecurityService securityService;

  @Autowired
  private UserService userService;

  @Autowired
  private OrganizationMembershipInvitationRepository organizationMembershipInvitationRepository;

  @Autowired
  private OrganizationMembershipRequestRepository organizationMembershipRequestRepository;

  @Override
  public Page<OrganizationMembership> getCurrentUserOrganizations(Principal principal, Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUser(principal);
    return organizationMembershipService.getUserOrganizations(context, user, pageable);
  }

  @Override
  public ResponseEntity<OrganizationMembershipRequest> createOrganizationMembershipRequest(Principal principal, String oid, String uid) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);

    stx.shooterstatistic.model.Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    OrganizationMembershipRequest request = new OrganizationMembershipRequest(organization, user);
    return new ResponseEntity<>(organizationMembershipRequestRepository.save(request), HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<OrganizationMembershipInvitation> createOrganizationMembershipInvitation(Principal principal, String oid, String uid) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);

    stx.shooterstatistic.model.Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    OrganizationMembershipInvitation request = new OrganizationMembershipInvitation(organization, user);
    return new ResponseEntity<>(organizationMembershipInvitationRepository.save(request), HttpStatus.CREATED);
  }

  @Override
  public Page<OrganizationMembershipInvitation> findOrganizationMembershipInvitations(Principal principal, String oid, String uid, Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);

    stx.shooterstatistic.model.Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);

    return organizationService.searchInvitations(context, organization, user, pageable);
  }

  @Override
  public Page<OrganizationMembershipRequest> findOrganizationMembershipRequests(Principal principal, String oid, String uid, Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);

    stx.shooterstatistic.model.Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);

    return organizationService.searchRequests(context, organization, user, pageable);
  }
}