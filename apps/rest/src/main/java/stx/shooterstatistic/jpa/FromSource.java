package stx.shooterstatistic.jpa;

import javax.persistence.criteria.From;
import javax.validation.constraints.NotNull;
import javax.persistence.criteria.Path;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class FromSource<X> {

  private From<X,X> root;

  private Map<String, From<X, ?>> joins = new HashMap<>();

  public FromSource(From<X,X> root) {
    this.root = Objects.requireNonNull(root);
  }

  public void addFrom(@NotNull String column, @NotNull From<X, ?> from) {
    Objects.requireNonNull(column);
    Objects.requireNonNull(from);

    if (joins.containsKey(column))
      throw new IllegalArgumentException(MessageFormat.format("Column ''{0}'' is already registered.", column));

    joins.put(column, from);
  }

  public boolean contains(String column) {
    return joins.containsKey(column);
  }

  public <Y> Path<Y> getPath(String column) {
    if (joins.containsKey(column))
      return joins.get(column).get(column);

    return root.get(column);
  }
}
