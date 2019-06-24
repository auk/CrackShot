package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.model.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.util.*;

import static stx.shooterstatistic.jpa.CriteriaBuilderHelper.createOrders;

public class TrainingParticipantQueryBuilder {
  EntityManager entityManager;

  FromSource<TrainingParticipant> fromSource;

  public TrainingParticipantQueryBuilder(EntityManager entityManager) {
    this.entityManager = Objects.requireNonNull(entityManager);
  }

  public CriteriaQuery<TrainingParticipant> build(TrainingParticipantSearchCriteria searchCriteria, Pageable pageable) {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<TrainingParticipant> criteriaQuery = builder.createQuery(TrainingParticipant.class);
    Root<TrainingParticipant> root = criteriaQuery.from(TrainingParticipant.class);

    fromSource = new FromSource<>(root);

    List<Predicate> params = new ArrayList<>();

    // step 1: organizations
    List<String> oids = searchCriteria.getOrganizations();
    if (oids != null && !oids.isEmpty()) {
      Join<TrainingParticipant, Organization> joinOrganization = root.join("organization", JoinType.INNER);
      params.add(joinOrganization.get("id").in(oids));
    }

    // step 2: users
    List<String> users = searchCriteria.getUsers();
    if (users != null && !users.isEmpty()) {
      Join<TrainingParticipant, User> joinUser = root.join("user", JoinType.INNER);
      params.add(joinUser.get("id").in(users));
    }

//    List<Selection<?>> columns = new ArrayList<>();
//    Join<TrainingParticipant, Training> joinTraining = root.join("training", JoinType.INNER);
//    columns.add(joinTraining.get("date"));
//    fromSource.addFrom("date", joinTraining);

    // step 3: dates
    if (searchCriteria.getDateFrom() != null) {
      params.add(builder.greaterThanOrEqualTo(root.get("date"), searchCriteria.getDateFrom()));
    }
    if (searchCriteria.getDateTo() != null) {
      params.add(builder.lessThanOrEqualTo(root.get("date"), searchCriteria.getDateTo()));
    }

    criteriaQuery.where(params.toArray(new Predicate[0]));
//    criteriaQuery.multiselect(columns);

    // order by
    if (pageable != null && pageable.getSort() != null && !pageable.isUnpaged()) {
      criteriaQuery.orderBy(createOrders(builder, fromSource, pageable.getSort()));
    } else {
      criteriaQuery.orderBy(createDefaultOrders(builder, fromSource));
    }

    criteriaQuery.distinct(true);

    return criteriaQuery;
  }

  private List<Order> createDefaultOrders(CriteriaBuilder builder, FromSource<TrainingParticipant> root) {
    Path<TrainingParticipant> date = root.getPath("date");
    return Collections.singletonList(builder.asc(date));
  }
}
