package stx.shooterstatistic.jpa;

import java.io.Serializable;
import java.util.Collection;

public class OrganizationSeachCriteria implements Serializable {
  String term;
  Collection<String> users; // users id
}
