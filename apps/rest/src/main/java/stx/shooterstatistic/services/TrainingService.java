package stx.shooterstatistic.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.TrainingParticipantRepository;
import stx.shooterstatistic.jpa.TrainingRepository;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.util.Definable;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static stx.shooterstatistic.jpa.CriteriaBuilderHelper.createOrders;
import static stx.shooterstatistic.jpa.CriteriaBuilderHelper.setPagable;

@Service
public class TrainingService {

  private final static Logger log = LoggerFactory.getLogger(TrainingService.class);

  @Autowired
  SecurityService securityService;

  @Autowired
  TrainingRepository trainingRepository;

  @Autowired
  TrainingParticipantRepository trainingParticipantRepository;

  @Autowired
  OrganizationMembershipService organizationMembershipService;

  @Autowired
  OrganizationService organizationService;

  @Autowired
  UserService userService;

  @Autowired
  EntityManager entityManager;

  @NotNull
  public Training createTraining(
     @NotNull SecurityContext context,
     @NotNull LocalDate date,
     @NotNull LocalTime time,
     @Null Organization organization,
     @Null List<User> users)
  {
    securityService.checkHasAccess(context, organization, Permission.READ);

    Training training = new Training(date, organization);
    training.setTime(time);

    final Training tr = trainingRepository.save(training);
    if (users != null)
      users.forEach(u -> participate(context, tr, u));
    return tr;
  }

  public void deleteTraining(@NotNull SecurityContext context, @NotNull Training training) {
    Objects.requireNonNull(training);
    securityService.checkHasAccess(context, training.getOrganization(), Permission.READ);
    trainingRepository.delete(training);
  }

  private List<Predicate> buildSearchParameters(@NotNull CriteriaBuilder builder, @NotNull Root<Training> rootTraining, TrainingSearchCriteria criteria) {
    List<Predicate> params = new ArrayList<>();
    if (criteria != null) {

      Definable<String> defOrg = Objects.requireNonNull(criteria.getOrganization());
      if (defOrg.isDefined()) {
        Optional<String> opOrg = defOrg.optional();
        if (opOrg.isPresent()) {
          Join<Training, Organization> joinOrganization = rootTraining.join("organization", JoinType.INNER);
          params.add(builder.equal(joinOrganization.get("id"), opOrg.get()));
        } else {
          params.add(builder.isNull(rootTraining.get("organization")));
        }
      }

      if (criteria.getDateFrom() != null) {
        params.add(builder.greaterThanOrEqualTo(rootTraining.get("date"), criteria.getDateFrom()));
      }
      if (criteria.getDateTo() != null) {
        params.add(builder.lessThanOrEqualTo(rootTraining.get("date"), criteria.getDateTo()));
      }

      List<String> users = criteria.getUsers();
      if (users != null && !users.isEmpty()) {
        Join<Training, TrainingParticipant> joinParticipant = rootTraining.join("participants", JoinType.LEFT);
        Join<TrainingParticipant, User> joinUser = joinParticipant.join("user", JoinType.LEFT);
        params.add(joinUser.get("id").in(users));
      }
    }
    return params;
  }

  private List<Order> createDefaultOrders(CriteriaBuilder builder, Root<Training> rootTimeEntry) {
    Path<Training> date = rootTimeEntry.get("date");
    return Collections.singletonList(builder.asc(date));
  }

  private TrainingSearchCriteria normalizeSearchCriteria(@NotNull SecurityContext context, @NotNull TrainingSearchCriteria searchCriteria) {
    if (searchCriteria == null)
      searchCriteria = new TrainingSearchCriteria();

    Definable<String> defOrg = searchCriteria.getOrganization();

    if (!userService.isGlobalAdmin(context.getUser())) {
      if (!defOrg.isPresent()) {
        searchCriteria = new TrainingSearchCriteria(searchCriteria).setUsers(Collections.singletonList(context.getUser().getId()));
      } else {
        String oid = defOrg.velue();
        Objects.requireNonNull(oid);

        Organization organization = organizationService.getOrganization(context, oid);
        if (!organizationService.isOwner(context, organization, context.getUser()) && !organizationMembershipService.isAdmin(context, organization, context.getUser())) {
          searchCriteria = new TrainingSearchCriteria(searchCriteria).setUsers(Collections.singletonList(context.getUser().getId()));
        }
      }
    }
    return searchCriteria;
  }

  public Page<Training> findTrainings(@NotNull SecurityContext context, @NotNull TrainingSearchCriteria searchCriteria, @NotNull Pageable pageable) {

    searchCriteria = normalizeSearchCriteria(context, searchCriteria);

    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Training> criteriaQuery = builder.createQuery(Training.class);
    Root<Training> rootTimeEntry = criteriaQuery.from(Training.class);

    List<Predicate> params = buildSearchParameters(builder, rootTimeEntry, searchCriteria);
    criteriaQuery.where(params.toArray(new Predicate[0]));

    if (pageable != null && pageable.getSort() != null && !pageable.isUnpaged()) {
      criteriaQuery.orderBy(createOrders(builder, rootTimeEntry, pageable.getSort()));
    } else {
      criteriaQuery.orderBy(createDefaultOrders(builder, rootTimeEntry));
    }

    criteriaQuery.distinct(true);

    TypedQuery<Training> q = entityManager.createQuery(criteriaQuery);
    setPagable(q, pageable);

    List<Training> result = q.getResultList();
    return new PageImpl<>(result, pageable, result.size());
  }

  public Optional<Training> findTraining(SecurityContext context, @NotNull String id) {
    Objects.requireNonNull(id);

    Optional<Training> training = trainingRepository.findById(id);
    // TODO: check security
    return training;
  }

  @NotNull
  public Training getTraining(SecurityContext context, @NotNull String id) {
    return findTraining(context, id).orElseThrow(() -> new ResourceNotFoundException("Training", id));
  }

  public boolean isParticipated(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user) {
    Objects.requireNonNull(training);
    Objects.requireNonNull(user);

    Organization organization = training.getOrganization();
    securityService.checkHasAccess(context, organization, Permission.READ);

    return trainingParticipantRepository.findByTrainingAndUser(training, user).isPresent();
  }

  public TrainingParticipant participate(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user) {
    Objects.requireNonNull(training);
    Objects.requireNonNull(user);

    Organization organization = training.getOrganization();
    securityService.checkHasAccess(context, organization, Permission.READ);

//    log.info("- participating training: {}, user: {}, organization: {}", training.getId(), user.getId(), organization);

    return trainingParticipantRepository
      .findByTrainingAndUser(training, user)
      .orElseGet(() -> trainingParticipantRepository.save(new TrainingParticipant(training, user)));
  }

  public void leaveTraining(@NotNull SecurityContext context, @NotNull Training training, @NotNull User user) {
    Objects.requireNonNull(training);
    Objects.requireNonNull(user);

    trainingParticipantRepository.findByTrainingAndUser(training, user).ifPresent(p -> trainingParticipantRepository.delete(p));
  }
}
