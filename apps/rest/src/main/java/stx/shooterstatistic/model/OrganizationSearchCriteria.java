package stx.shooterstatistic.model;

import java.io.Serializable;
import java.util.List;

public class OrganizationSearchCriteria implements Serializable {
  private String term;
  private List<String> users; // users id

  public String getTerm() {
    return term;
  }

  public void setTerm(String term) {
    this.term = term;
  }

  public List<String> getUsers() {
    return users;
  }

  public void setUsers(List<String> users) {
    this.users = users;
  }
}
