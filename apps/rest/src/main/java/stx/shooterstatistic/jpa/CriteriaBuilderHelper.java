package stx.shooterstatistic.jpa;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import stx.shooterstatistic.model.Training;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public final class CriteriaBuilderHelper {

  private CriteriaBuilderHelper() {}

  public static List<Order> createOrders(CriteriaBuilder builder, Root<?> rootTimeEntry, Sort sort) {
    Objects.requireNonNull(sort);

    List<Order> orders = new ArrayList<>();
    for (Sort.Order orderString : sort) {
      Path<Training> p = rootTimeEntry.get(orderString.getProperty());
      Order order = orderString.isAscending() ? builder.asc(p) : builder.desc(p);
      orders.add(order);
    }
    return orders;
  }

  public static void setPagable(@NotNull TypedQuery<?> query, Pageable pageable) {
    if (pageable != null && !pageable.isUnpaged()) {
      query.setFirstResult((int) pageable.getOffset());
      query.setMaxResults(pageable.getPageSize());
    }
  }
}
