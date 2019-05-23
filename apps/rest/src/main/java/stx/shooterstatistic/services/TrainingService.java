package stx.shooterstatistic.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
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
import java.util.*;

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
  EntityManager entityManager;

  @NotNull
  public Training createTraining(@NotNull SecurityContext context, @NotNull LocalDate date, @Null Organization organization, @Null List<User> users) {
    securityService.checkHasAccess(context, organization, Permission.READ);

    Training training = trainingRepository.save(new Training(date, organization));
    if (users != null)
      users.forEach(u -> participate(context, training, u));
    return training;
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

  private List<Order> createOrders(CriteriaBuilder builder, Root<Training> rootTimeEntry, Sort sort) {
    Objects.requireNonNull(sort);

    List<Order> orders = new ArrayList<>();
    for (Sort.Order orderString : sort) {
      Path<Training> p = rootTimeEntry.get(orderString.getProperty());
      Order order = orderString.isAscending() ? builder.asc(p) : builder.desc(p);
      orders.add(order);
    }
    return orders;
  }

  private List<Order> createDefaultOrders(CriteriaBuilder builder, Root<Training> rootTimeEntry) {
    Path<Training> date = rootTimeEntry.get("date");
    return Collections.singletonList(builder.asc(date));
  }

  public Page<Training> findTrainings(@NotNull SecurityContext context, TrainingSearchCriteria searchCriteria, Pageable pageable) {

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
    if (pageable != null && !pageable.isUnpaged()) {
      q.setFirstResult((int) pageable.getOffset());
      q.setMaxResults(pageable.getPageSize());
    }

    List<Training> result = q.getResultList();
    return new PageImpl<>(result, pageable, result.size());
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

    log.info("- participating training: {}, user: {}, organization: {}", training.getId(), user.getId(), organization);

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
