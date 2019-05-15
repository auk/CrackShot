package stx.shooterstatistic.jpa;

import java.io.Serializable;
import java.util.Collection;

public class UserSearchCriteria implements Serializable {
  String term;
  Collection<String> orgs; // organizations id
}
