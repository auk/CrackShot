package stx.shooterstatistic.model;

import java.io.Serializable;
import java.util.List;

public class OrganizationSearchCriteria implements Serializable {
  String term;
  List<String> users; // users id
}
