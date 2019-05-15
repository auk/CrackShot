package stx.shooterstatistic.jpa;

import java.io.Serializable;
import java.util.Collection;

public class OrganizationSearchCriteria implements Serializable {
  String term;
  Collection<String> users; // users id
}
