package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.model.OrganizationSearchCriteria;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.rest.OrganizationApi;
import stx.shooterstatistic.interfaces.IOrganizationService;
import stx.shooterstatistic.interfaces.ISecurityService;
import stx.shooterstatistic.interfaces.IUserService;

import javax.validation.constraints.NotNull;
import java.security.Principal;

@RestController
public class OrganizationController implements OrganizationApi {

  private static final Logger log = LoggerFactory.getLogger(OrganizationController.class);

  @Autowired
  private IOrganizationService organizationService;

  @Autowired
  private ISecurityService securityService;

  @Autowired
  private IUserService userService;

  @Override
  public Page<stx.shooterstatistic.model.Organization> getOrganizations(Principal principal, OrganizationSearchCriteria organizationSearchCriteria, Pageable pageable)
  {
    SecurityContext context = securityService.createContext(principal);
    return organizationService.getOrganizations(context, organizationSearchCriteria, pageable);
  }

  @Override
  public ResponseEntity<stx.shooterstatistic.model.Organization> createOrganization(Principal principal, String name, String address, String web, String email, String phone) {
    log.debug("POST /ws, principal: {}, name: {}", principal, name);

    stx.shooterstatistic.model.Organization org = organizationService.createOrganization(principal, name);
    org.setAddress(address);
    org.setEmail(email);
    org.setWeb(web);
    org.setPhone(phone);

    SecurityContext context = securityService.createContext(principal);
    return new ResponseEntity<>(organizationService.save(context, org), HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<stx.shooterstatistic.model.Organization> getOrganization(@NotNull Principal principal, String id) {
    SecurityContext context = securityService.createContext(principal);
    return ResponseEntity.ok(organizationService.getOrganization(context, id));
  }

  @Override
  public ResponseEntity<stx.shooterstatistic.model.Organization> updateOrganization(@NotNull Principal principal, String id, String name, String address, String web, String email, String phone) {
    SecurityContext context = securityService.createContext(principal);
    stx.shooterstatistic.model.Organization org = organizationService.getOrganization(context, id);
    org.setAddress(address);
    org.setName(name);
    org.setPhone(phone);
    org.setWeb(web);
    org.setEmail(email);
    org = organizationService.save(context, org);
    return ResponseEntity.ok(org);
  }

  @Override
  public ResponseEntity<Void> deleteOrganization(@NotNull Principal principal, String id) {
    SecurityContext context = securityService.createContext(principal);
    stx.shooterstatistic.model.Organization organization = organizationService.getOrganization(context, id);
    organizationService.deleteOrganization(context, organization);
    return ResponseEntity.ok().build();
  }
}
