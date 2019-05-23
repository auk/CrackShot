package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.jpa.TrainingParticipantRepository;
import stx.shooterstatistic.jpa.TrainingRepository;
import stx.shooterstatistic.model.*;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.util.*;

@Service
public class TrainingService {

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

      if (criteria.getOrganization() == null) {
        params.add(builder.isNull(rootTraining.get("organization")));
      } else {
        Join<Training, Organization> joinOrganization = rootTraining.join("organization", JoinType.INNER);
        params.add(builder.equal(joinOrganization.get("id"), criteria.getOrganization()));
      }

      if (criteria.getDateFrom() != null) {
        params.add(builder.greaterThanOrEqualTo(rootTraining.get("date"), criteria.getDateFrom()));
      }
      if (criteria.getDateTo() != null) {
        params.add(builder.lessThanOrEqualTo(rootTraining.get("date"), criteria.getDateTo()));
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

    List<Predicate> params = new ArrayList<>();
    params.addAll(buildSearchParameters(builder, rootTimeEntry, searchCriteria));

    if (pageable != null && pageable.getSort() != null && !pageable.isUnpaged()) {
      criteriaQuery.orderBy(createOrders(builder, rootTimeEntry, pageable.getSort()));
    } else {
      criteriaQuery.orderBy(createDefaultOrders(builder, rootTimeEntry));
    }

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
