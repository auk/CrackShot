package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.jpa.TrainingParticipantQueryBuilder;
import stx.shooterstatistic.jpa.TrainingParticipantRepository;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.interfaces.IOrganizationMembershipService;
import stx.shooterstatistic.interfaces.ISecurityService;
import stx.shooterstatistic.interfaces.ITrainingParticipantService;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static stx.shooterstatistic.jpa.CriteriaBuilderHelper.setPagable;

@Service
public class TrainingParticipantServiceImpl implements ITrainingParticipantService {

  @Autowired
  IOrganizationMembershipService organizationMembershipService;
  @Autowired
  ISecurityService securityService;

  @Autowired TrainingParticipantRepository trainingParticipantRepository;

  @Autowired EntityManager entityManager;

  private TrainingParticipantSearchCriteria normalizeSearchCriteria(SecurityContext context, TrainingParticipantSearchCriteria searchCriteria) {
    if (searchCriteria == null)
      searchCriteria = new TrainingParticipantSearchCriteria();

    if (securityService.isGlobalAdmin(context))
      return searchCriteria;

    // step 1: normalize organizations - allow only organizations with valid memberships
    Page<OrganizationMembership> memberships = organizationMembershipService.getUserOrganizations(context, context.getUser(), Pageable.unpaged());
    List<String> validOids = memberships.get().map(m -> m.getOrganization().getId()).collect(Collectors.toList());
    if (searchCriteria.getOrganizations() == null)
      searchCriteria.setOrganizations(validOids);
    else
      searchCriteria.setOrganizations(searchCriteria.getOrganizations().stream().filter(validOids::contains).collect(Collectors.toList()));

    // step 2: allow only current user training
    searchCriteria.setUsers(Collections.singletonList(context.getUser().getId()));

    return searchCriteria;
  }

  @Override
  public Optional<TrainingParticipant> findTrainingParticipants(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user) {
    return trainingParticipantRepository.findByTrainingAndUser(training, user);
  }

  @Override
  public Page<TrainingParticipant> findTrainingParticipants(
     @NotNull SecurityContext context,
     TrainingParticipantSearchCriteria searchCriteria,
     @NotNull Pageable pageable)
  {
    Objects.requireNonNull(context);

    searchCriteria = normalizeSearchCriteria(context, searchCriteria);
    Objects.requireNonNull(searchCriteria);

    TrainingParticipantQueryBuilder queryBuilder = new TrainingParticipantQueryBuilder(entityManager);
    CriteriaQuery<TrainingParticipant> criteriaQuery = queryBuilder.build(searchCriteria, pageable);

    TypedQuery<TrainingParticipant> q = entityManager.createQuery(criteriaQuery);
    setPagable(q, pageable);

    List<TrainingParticipant> result = q.getResultList();
    return new PageImpl<>(result, pageable, result.size());
  }

  @Override
  public TrainingParticipant save(@NotNull SecurityContext context, @NotNull TrainingParticipant trainingParticipant) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(trainingParticipant);

    return trainingParticipantRepository.save(trainingParticipant);
  }
}