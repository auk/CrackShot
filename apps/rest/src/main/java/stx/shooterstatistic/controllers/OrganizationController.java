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
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.OrganizationSearchCriteria;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import java.security.Principal;

@RestController
public class OrganizationController {

  private final static Logger log = LoggerFactory.getLogger(OrganizationController.class);

  @Autowired
  OrganizationService organizationService;

  @Autowired
  SecurityService securityService;

  @Autowired
  UserService userService;

  @GetMapping(value = "/organizations")
  public Page<Organization> getOrganizations(Principal principal,
    @RequestParam(required = false) OrganizationSearchCriteria organizationSearchCriteria,
    @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable)
  {
    User user = userService.findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
    SecurityContext context = securityService.createContext(user);

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

    User user = userService.findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
    SecurityContext context = securityService.createContext(user);

    return new ResponseEntity<>(organizationService.save(context, org), HttpStatus.CREATED);
  }

  @GetMapping(value = "/organization/{id}")
  public ResponseEntity<Organization> getOrganization(Principal principal, @PathVariable String id) {
    User user = userService.findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
    SecurityContext context = securityService.createContext(user);

    return ResponseEntity.ok(organizationService.getOrganization(context, id));
  }

  @DeleteMapping(value = "/organization/{id}")
  public ResponseEntity<Void> deleteOrganization(Principal principal, @PathVariable String id) {
    User user = userService.findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
    SecurityContext context = securityService.createContext(user);

    organizationService.deleteOrganization(context, id);
    return ResponseEntity.ok().build();
  }
}
