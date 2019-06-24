package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceAlreadyExistsException;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.OrganizationMembershipInvitationRepository;
import stx.shooterstatistic.jpa.OrganizationMembershipRequestRepository;
import stx.shooterstatistic.jpa.OrganizationRepository;
import stx.shooterstatistic.model.*;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static stx.shooterstatistic.jpa.CriteriaBuilderHelper.createOrders;
import static stx.shooterstatistic.jpa.CriteriaBuilderHelper.setPagable;

@Service
@Transactional
public class OrganizationService {
  @Autowired
  OrganizationRepository organizationRepository;

  @Autowired
  OrganizationMembershipInvitationRepository organizationMembershipInvitationRepository;

  @Autowired
  OrganizationMembershipRequestRepository organizationMembershipRequestRepository;

  @Autowired
  SecurityService securityService;

  @Autowired
  UserService userService;

  @Autowired
  OrganizationMembershipService organizationMembershipService;

  @Autowired
  EntityManager entityManager;

  @NotNull
  public Organization createOrganization(Principal principal, String name) {
    Objects.requireNonNull(principal);
    Objects.requireNonNull(name);

    if (organizationRepository.findByName(name).isPresent())
      throw new ResourceAlreadyExistsException("Organization", name);

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

  public void deleteOrganization(SecurityContext context, Organization organization) {
    Objects.requireNonNull(organization);

    securityService.checkHasAccess(context, organization, Permission.WRITE);

    organizationMembershipService.unregisterAll(context, organization);
    organizationRepository.delete(organization);
  }

  @NotNull
  public Organization getOrganization(SecurityContext context, String id) {
    Organization org = organizationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Organization", id));
    securityService.checkHasAccess(context, org, Permission.READ);
    return org;
  }

  public Page<Organization> getOrganizations(SecurityContext context, OrganizationSearchCriteria criteris, Pageable pageable) {
    return organizationRepository.findAll(pageable);
  }

  public boolean isOwner(@NotNull SecurityContext context, @NotNull Organization organization, @NotNull User user) {
    Objects.requireNonNull(organization);
    Objects.requireNonNull(user);
    return organization.getOwner().getId().equals(user.getId());
  }

  @NotNull
  public Organization save(@NotNull SecurityContext context, @NotNull Organization org) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(org);

    securityService.checkHasAccess(context, org, Permission.WRITE);
    return organizationRepository.save(org);
  }


  private List<Order> createInvitationDefaultOrders(CriteriaBuilder builder, Root<OrganizationMembershipInvitation> rootTimeEntry) {
    Path<OrganizationMembershipInvitation> date = rootTimeEntry.get("created");
    return Collections.singletonList(builder.asc(date));
  }

  private List<Order> createRequestDefaultOrders(CriteriaBuilder builder, Root<OrganizationMembershipRequest> rootTimeEntry) {
    Path<OrganizationMembershipInvitation> date = rootTimeEntry.get("created");
    return Collections.singletonList(builder.asc(date));
  }

  public Page<OrganizationMembershipInvitation> searchInvitations(@NotNull SecurityContext context, Organization organization, User user, @NotNull Pageable pageable) {
    Objects.requireNonNull(pageable);

    if (organization != null) {
      if (!securityService.hasAccess(context, organization, Permission.READ))
        throw new SecurityException("Has no access to organization " + organization.getName());

      if (user == null || !organizationMembershipService.isAdmin(context, organization, context.getUser()))
        user = context.getUser();
    } else {
      if (!securityService.isGlobalAdmin(context))
        user = context.getUser();
    }

    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<OrganizationMembershipInvitation> criteriaQuery = builder.createQuery(OrganizationMembershipInvitation.class);
    Root<OrganizationMembershipInvitation> root = criteriaQuery.from(OrganizationMembershipInvitation.class);

    List<Predicate> params = new ArrayList<>();
    if (organization != null)
      params.add(builder.equal(root.get("organization"), organization));
    if (user != null)
      params.add(builder.equal(root.get("user"), user));

    criteriaQuery.where(params.toArray(new Predicate[0]));

    if (pageable.getSort() != null && !pageable.isUnpaged()) {
      criteriaQuery.orderBy(createOrders(builder, root, pageable.getSort()));
    } else {
      criteriaQuery.orderBy(createInvitationDefaultOrders(builder, root));
    }

    TypedQuery<OrganizationMembershipInvitation> q = entityManager.createQuery(criteriaQuery);
    setPagable(q, pageable);

    List<OrganizationMembershipInvitation> result = q.getResultList();
    return new PageImpl<>(result, pageable, result.size());
  }

  public Page<OrganizationMembershipRequest> searchRequests(@NotNull SecurityContext context, Organization organization, User user, @NotNull Pageable pageable) {
    Objects.requireNonNull(pageable);

    if (organization != null) {
      if (!securityService.hasAccess(context, organization, Permission.READ))
        throw new SecurityException("Has no access to organization " + organization.getName());

      if (user == null || !organizationMembershipService.isAdmin(context, organization, context.getUser()))
        user = context.getUser();
    } else {
      if (!securityService.isGlobalAdmin(context))
        user = context.getUser();
    }

    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<OrganizationMembershipRequest> criteriaQuery = builder.createQuery(OrganizationMembershipRequest.class);
    Root<OrganizationMembershipRequest> root = criteriaQuery.from(OrganizationMembershipRequest.class);

    List<Predicate> params = new ArrayList<>();
    if (organization != null)
      params.add(builder.equal(root.get("organization"), organization));
    if (user != null)
      params.add(builder.equal(root.get("user"), user));

    criteriaQuery.where(params.toArray(new Predicate[0]));

    if (pageable.getSort() != null && !pageable.isUnpaged()) {
      criteriaQuery.orderBy(createOrders(builder, root, pageable.getSort()));
    } else {
      criteriaQuery.orderBy(createRequestDefaultOrders(builder, root));
    }

    TypedQuery<OrganizationMembershipRequest> q = entityManager.createQuery(criteriaQuery);
    setPagable(q, pageable);

    List<OrganizationMembershipRequest> result = q.getResultList();
    return new PageImpl<>(result, pageable, result.size());
  }
}
