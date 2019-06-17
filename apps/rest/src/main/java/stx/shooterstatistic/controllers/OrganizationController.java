package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.jpa.OrganizationMembershipInvitationRepository;
import stx.shooterstatistic.jpa.OrganizationMembershipRequestRepository;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Objects;

@RestController
public class OrganizationController {

  private final static Logger log = LoggerFactory.getLogger(OrganizationController.class);

  @Autowired
  private OrganizationService organizationService;

  @Autowired
  private SecurityService securityService;

  @Autowired
  private UserService userService;

  @Autowired
  private OrganizationMembershipInvitationRepository organizationMembershipInvitationRepository;

  @Autowired
  private OrganizationMembershipRequestRepository organizationMembershipRequestRepository;

  @GetMapping(value = "/organizations")
  public Page<Organization> getOrganizations(Principal principal,
    @RequestParam(required = false) OrganizationSearchCriteria organizationSearchCriteria,
    @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable)
  {
    SecurityContext context = securityService.createContext(principal);
    return organizationService.getOrganizations(context, organizationSearchCriteria, pageable);
  }

  @PostMapping(value = "/organization")
  public ResponseEntity<Organization> createOrganization(Principal principal,
    @RequestParam String name,
    @RequestParam(required = false) String web,
    @RequestParam(required = false) String email,
    @RequestParam(required = false) String phone
  ) {
    log.debug("POST /ws, principal: {}, name: {}", principal, name);

    Organization org = organizationService.createOrganization(principal, name);
    if (email != null && !email.isEmpty())
      org.setEmail(email);
    if (web != null && !web.isEmpty())
      org.setWeb(web);
    if (phone != null && !phone.isEmpty())
      org.setPhone(phone);

    SecurityContext context = securityService.createContext(principal);
    return new ResponseEntity<>(organizationService.save(context, org), HttpStatus.CREATED);
  }

  @GetMapping(value = "/organization/{id}")
  public ResponseEntity<Organization> getOrganization(@NotNull Principal principal, @PathVariable String id) {
    SecurityContext context = securityService.createContext(principal);
    return ResponseEntity.ok(organizationService.getOrganization(context, id));
  }

  @DeleteMapping(value = "/organization/{id}")
  public ResponseEntity<Void> deleteOrganization(@NotNull Principal principal, @PathVariable String id) {
    SecurityContext context = securityService.createContext(principal);
    Organization organization = organizationService.getOrganization(context, id);
    organizationService.deleteOrganization(context, organization);
    return ResponseEntity.ok().build();
  }

  @PostMapping(value = "/organization/{oid}/request")
  public ResponseEntity<OrganizationMembershipRequest> createOrganizationMembershipRequest(
     Principal principal,
     @PathVariable String oid,
     @RequestParam String uid
  ) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);

    Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    OrganizationMembershipRequest request = new OrganizationMembershipRequest(organization, user);
    return new ResponseEntity<>(organizationMembershipRequestRepository.save(request), HttpStatus.CREATED);
  }

  @PostMapping(value = "/organization/{oid}/invitation")
  public ResponseEntity<OrganizationMembershipInvitation> createOrganizationMembershipInvitation(
     Principal principal,
     @PathVariable String oid,
     @RequestParam String uid
  ) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);

    Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    OrganizationMembershipInvitation request = new OrganizationMembershipInvitation(organization, user);
    return new ResponseEntity<>(organizationMembershipInvitationRepository.save(request), HttpStatus.CREATED);
  }

  @GetMapping(value = "/organization/invitations")
  public Page<OrganizationMembershipInvitation> findOrganizationMembershipInvitations(
     Principal principal,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) String uid,
     @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  ) {
    SecurityContext context = securityService.createContext(principal);

    Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);


    return organizationService.searchInvitations(context, organization, user, pageable);
  }

  @GetMapping(value = "/organization/requests")
  public Page<OrganizationMembershipRequest> findOrganizationMembershipRequests(
     Principal principal,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) String uid,
     @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  ) {
    SecurityContext context = securityService.createContext(principal);

    Organization organization = organizationService.getOrganization(context, oid);
    Objects.requireNonNull(organization);

    User user = userService.getUserById(context, uid);
    Objects.requireNonNull(user);


    return organizationService.searchRequests(context, organization, user, pageable);
  }
}
