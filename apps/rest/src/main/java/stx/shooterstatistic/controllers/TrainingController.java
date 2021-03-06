package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.services.*;
import stx.shooterstatistic.util.Definable;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TrainingController {

  private final static Logger log = LoggerFactory.getLogger(TrainingController.class);

  @Autowired
  private OrganizationService organizationService;

  @Autowired
  private SecurityService securityService;

  @Autowired
  private TrainingService trainingService;

  @Autowired
  TrainingElementService trainingElementService;

  @Autowired
  private TrainingParticipantService trainingParticipantService;

  @Autowired
  private UserService userService;

  @PostMapping(value = "/training")
  public ResponseEntity<Training> createTraining(
     Principal principal,
     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) List<String> users,
     @RequestParam(required = false) List<String> elems,
     @RequestParam(required = false) Boolean participate,
     @RequestParam(required = false) Integer shots,
     @RequestParam(required = false) Integer cost) {

    User currentUser = userService.getUser(principal);
    SecurityContext context = securityService.createContext(principal);

    Organization organization = null;
    if (oid != null && !oid.isEmpty()) {
      organization = organizationService.getOrganization(context, oid);
    }

    List<User> participants = new ArrayList<>();
    if (users != null) {
      users.forEach(uid -> userService.findUserById(context, uid).ifPresent(participants::add));
    }

    List<TrainingElement> elements = new ArrayList<>();
    if (elems != null) {
      elems.forEach(id -> trainingElementService.find(id).ifPresent(elements::add));
    }

    Training training = trainingService.createTraining(context, date, time, organization, participants, elements);
    if (cost != null || shots != null) {
      trainingParticipantService.findTrainingParticipant(context, training, currentUser).ifPresent(tp -> {
        tp.setShots(shots);
        tp.setCost(BigDecimal.valueOf(cost));
        trainingParticipantService.save(context, tp);
      });
    }
    return new ResponseEntity<>(training, HttpStatus.CREATED);
  }

  @GetMapping(value = "/training/{tid}")
  public ResponseEntity<Training> getTraining(Principal principal, @PathVariable String tid) {
    SecurityContext context = securityService.createContext(principal);
    return ResponseEntity.ok(trainingService.getTraining(context, tid));
  }

  @DeleteMapping(value = "/training/{tid}")
  public ResponseEntity<Training> deleteTraining(Principal principal, @PathVariable String tid) {
    SecurityContext context = securityService.createContext(principal);
    Training training = trainingService.getTraining(context, tid);
    trainingService.deleteTraining(context, training);
    return ResponseEntity.ok().build();
  }

  @PostMapping(value = "/trainings/search")
  public Page<Training> searchTrainings(
     Principal principal,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) LocalDate from,
     @RequestParam(required = false) LocalDate to,
     @RequestParam(required = false) List<String> users,
     @PageableDefault(size = 50, sort = { "date", "time" }, direction = Sort.Direction.DESC) Pageable pageable)
  {
    SecurityContext context = securityService.createContext(principal);

    TrainingSearchCriteria searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setDateFrom(from);
    searchCriteria.setDateTo(to);
    searchCriteria.setUsers(users);
    if (oid != null)
      searchCriteria.setOrganization(Definable.of(oid));
    return trainingService.findTrainings(context, searchCriteria, pageable);
  }
}
