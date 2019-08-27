package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.TrainingParticipant;
import stx.shooterstatistic.model.TrainingParticipantSearchCriteria;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.TrainingParticipantService;
import stx.shooterstatistic.services.UserService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
public class TrainingParticipantController {
  private static final Logger log = LoggerFactory.getLogger(TrainingParticipantController.class);

  @Autowired
  SecurityService securityService;

  @Autowired
  TrainingParticipantService trainingParticipantService;

  @Autowired
  UserService userService;

  @PostMapping(value = "/user/trainings")
  public Page<TrainingParticipant> searchCurrentUserTrainingParticipants(
     @NotNull Principal principal,
     @RequestParam(required = false)List<String> orgs,
     @RequestParam(required = false) LocalDate from,
     @RequestParam(required = false) LocalDate to,
     @PageableDefault(size = 50, sort = { "date", "time" }, direction = Sort.Direction.DESC)Pageable pageable)
  {
    User user = userService.getUser(principal);
    SecurityContext securityContext = securityService.createContext(user);

    TrainingParticipantSearchCriteria searchCriteria = new TrainingParticipantSearchCriteria();
    searchCriteria.setUsers(Collections.singletonList(user.getId()));
    searchCriteria.setOrganizations(orgs);
    searchCriteria.setDateFrom(from);
    searchCriteria.setDateTo(to);

    return trainingParticipantService.findTrainingParticipant(securityContext, searchCriteria, pageable);
  }

  @PostMapping(value = "/user/{uid}/trainings")
  public Page<TrainingParticipant> searchTrainingParticipants(
     @NotNull Principal principal,
     @PathVariable String uid,
     @RequestParam(required = false)List<String> orgs,
     @RequestParam(required = false) LocalDate from,
     @RequestParam(required = false) LocalDate to,
     @PageableDefault(size = 50, sort = { "date" }, direction = Sort.Direction.DESC) Pageable pageable)
  {
    User user = userService.getUser(principal);
    SecurityContext securityContext = securityService.createContext(user);

    TrainingParticipantSearchCriteria searchCriteria = new TrainingParticipantSearchCriteria();
    searchCriteria.setUsers(Collections.singletonList(uid));
    searchCriteria.setOrganizations(orgs);
    searchCriteria.setDateFrom(from);
    searchCriteria.setDateTo(to);

    return trainingParticipantService.findTrainingParticipant(securityContext, searchCriteria, pageable);
  }
}
