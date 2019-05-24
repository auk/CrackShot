package stx.shooterstatistic.util;

import javax.validation.constraints.Null;
import java.lang.reflect.Field;
import java.util.Objects;
import java.util.Optional;

public class Definable<T> {

  private static Definable<?> createEmpty() {
    Definable<?> d = new Definable<>();

    try {
      Field f = d.getClass().getDeclaredField("defined");
      f.set(d, Boolean.TRUE);
    } catch (Throwable t) {
      throw new RuntimeException(t);
    }

    return d;
  }

  private static final Definable<?> EMPTY = createEmpty();

  private static final Definable<?> UNDEFINED = new Definable<>();

  private boolean defined;
  private final T value;

  private Definable() {
    this.defined = false;
    this.value = null;
  }

  private Definable(T value) {
    this.defined = true;
    this.value = Objects.requireNonNull(value);
  }

  public static <T> Definable<T> of(T value) {
    return new Definable<>(value);
  }

  public static <T> Definable<T> ofNullable(T value) {
    return value == null ? empty() : of(value);
  }

  public static<T> Definable<T> empty() {
    @SuppressWarnings("unchecked")
    Definable<T> t = (Definable<T>) EMPTY;
    return t;
  }

  public static<T> Definable<T> undefined() {
    @SuppressWarnings("unchecked")
    Definable<T> t = (Definable<T>) UNDEFINED;
    return t;
  }

  public boolean isDefined() {
    return defined;
  }

  public boolean isPresent() {
    return value != null;
  }

  public Optional<T> optional()
  {
    if (!defined)
      throw new UnsupportedOperationException("Value is not defined.");

    return Optional.ofNullable(value);
  }

  @Null
  public T velue() {
    if (!defined)
      throw new UnsupportedOperationException("Value is not defined.");

    return value;
  }
}
