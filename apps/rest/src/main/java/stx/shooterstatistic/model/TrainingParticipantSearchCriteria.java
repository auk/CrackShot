package stx.shooterstatistic.model;

import java.time.LocalDate;
import java.util.List;

public class TrainingParticipantSearchCriteria {
  String organizationId;

  List<String> users;

  LocalDate fromDate;

  LocalDate toDate;
}
