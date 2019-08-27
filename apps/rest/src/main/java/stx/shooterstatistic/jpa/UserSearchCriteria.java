package stx.shooterstatistic.jpa;

import java.io.Serializable;
import java.util.Collection;

public class UserSearchCriteria implements Serializable {
  private String term;
  private Collection<String> orgs; // organizations id

  public String getTerm() {
    return term;
  }

  public void setTerm(String term) {
    this.term = term;
  }

  public Collection<String> getOrgs() {
    return orgs;
  }

  public void setOrgs(Collection<String> orgs) {
    this.orgs = orgs;
  }
}
