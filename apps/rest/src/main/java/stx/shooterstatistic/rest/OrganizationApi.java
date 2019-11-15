package stx.shooterstatistic.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.OrganizationMembershipInvitation;
import stx.shooterstatistic.model.OrganizationMembershipRequest;
import stx.shooterstatistic.model.OrganizationSearchCriteria;

import javax.validation.constraints.NotNull;
import java.security.Principal;

public interface OrganizationApi {

  @GetMapping(value = "/organizations")
  Page<Organization> getOrganizations(
     @NotNull Principal principal,
     @RequestParam(required = false) OrganizationSearchCriteria organizationSearchCriteria,
     @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  );

  @PostMapping(value = "/organization")
  ResponseEntity<Organization> createOrganization(
     @NotNull Principal principal,
     @RequestParam String name,
     @RequestParam(required = false) String address,
     @RequestParam(required = false) String web,
     @RequestParam(required = false) String email,
     @RequestParam(required = false) String phone
  );

  @GetMapping(value = "/organization/{id}")
  ResponseEntity<Organization> getOrganization(@NotNull Principal principal, @PathVariable String id);

  @PutMapping(value = "/organization/{id}")
  ResponseEntity<Organization> updateOrganization(
     @NotNull Principal principal,
     @PathVariable String id,
     @RequestParam String name,
     @RequestParam(required = false) String address,
     @RequestParam(required = false) String web,
     @RequestParam(required = false) String email,
     @RequestParam(required = false) String phone
  );

  @DeleteMapping(value = "/organization/{id}")
  ResponseEntity<Void> deleteOrganization(@NotNull Principal principal, @PathVariable String id);
}
