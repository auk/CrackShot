package stx.shooterstatistic.util;

import org.junit.Assert;
import org.junit.Test;

public class DefinableTest {
  @Test
  public void testUndefined() {
    Definable<Object> d = Definable.undefined();
    Assert.assertFalse(d.isDefined());
  }

  @Test
  public void testDefined() {
    Assert.assertTrue(Definable.of("1").isDefined());
    Assert.assertTrue(Definable.ofNullable(null).isDefined());
    Assert.assertTrue(Definable.ofNullable("1").isDefined());
  }

  @Test(expected = UnsupportedOperationException.class)
  public void testOptionalUndefined() {
    Definable<Object> d = Definable.undefined();
    d.optional();
  }

  @Test
  public void testOptional() {
    Definable<String> d = Definable.of("auk");
    Assert.assertTrue(d.optional().isPresent());
    Assert.assertEquals("auk", d.optional().get());
  }

  @Test
  public void testOptionalNull() {
    Definable<String> d = Definable.ofNullable(null);
    Assert.assertFalse(d.optional().isPresent());
  }
}
