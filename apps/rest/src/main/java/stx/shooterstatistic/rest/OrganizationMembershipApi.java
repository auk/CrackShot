package stx.shooterstatistic.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import stx.shooterstatistic.model.OrganizationMembership;
import stx.shooterstatistic.model.OrganizationMembershipInvitation;
import stx.shooterstatistic.model.OrganizationMembershipRequest;

import java.security.Principal;

public interface OrganizationMembershipApi {

  // organization membership

  @GetMapping(value = "/user/organizations")
  Page<OrganizationMembership> getCurrentUserOrganizations(Principal principal, Pageable pageable);

  // organization membership invitations

  @PostMapping(value = "/organization/{oid}/invitation")
  ResponseEntity<OrganizationMembershipInvitation> createOrganizationMembershipInvitation(Principal principal, @PathVariable String oid, @RequestParam String uid);

  @GetMapping(value = "/organization/invitations")
  Page<OrganizationMembershipInvitation> findOrganizationMembershipInvitations(
     Principal principal,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) String uid,
     @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  );

  // organization membership requests

  @PostMapping(value = "/organization/{oid}/request")
  ResponseEntity<OrganizationMembershipRequest> createOrganizationMembershipRequest(
     Principal principal,
     @PathVariable String oid,
     @RequestParam String uid
  );

  @GetMapping(value = "/organization/requests")
  Page<OrganizationMembershipRequest> findOrganizationMembershipRequests(
     Principal principal,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) String uid,
     @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  );
}
