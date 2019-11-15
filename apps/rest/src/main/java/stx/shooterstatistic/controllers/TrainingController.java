package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.interfaces.*;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.rest.TrainingApi;
import stx.shooterstatistic.util.Definable;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TrainingController implements TrainingApi {

  private static final Logger log = LoggerFactory.getLogger(TrainingController.class);

  @Autowired
  private IOrganizationService organizationService;

  @Autowired
  private ISecurityService securityService;

  @Autowired
  private ITrainingService trainingService;

  @Autowired
  ITrainingElementService trainingElementService;

  @Autowired
  private ITrainingParticipantService trainingParticipantService;

  @Autowired
  private IUserService userService;

  @Override
  public ResponseEntity<Training> createTraining(
     Principal principal,
     LocalDate date,
     LocalTime time,
     String oid,
     List<String> users,
     List<String> elems,
     Boolean participate,
     Integer shots,
     Integer cost) {

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
      trainingParticipantService.findTrainingParticipants(context, training, currentUser).ifPresent(tp -> {
        tp.setShots(shots);
        tp.setCost(BigDecimal.valueOf(cost));
        trainingParticipantService.save(context, tp);
      });
    }
    return new ResponseEntity<>(training, HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<Training> getTraining(Principal principal, String tid) {
    SecurityContext context = securityService.createContext(principal);
    return ResponseEntity.ok(trainingService.getTraining(context, tid));
  }

  @Override
  public ResponseEntity<Training> deleteTraining(Principal principal, String tid) {
    SecurityContext context = securityService.createContext(principal);
    Training training = trainingService.getTraining(context, tid);
    trainingService.deleteTraining(context, training);
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Training> updateTraining(
     Principal principal, String tid,
     LocalDate date,
     LocalTime time,
     String oid,
     List<String> users,
     List<String> elems
  ) {
    SecurityContext context = securityService.createContext(principal);
    Training training = trainingService.getTraining(context, tid);
    training.setDate(date);
    training.setTime(time);

    Organization organization = null;
    if (oid != null && !oid.isEmpty()) {
      organization = organizationService.getOrganization(context, oid);
    }
    training.setOrganization(organization);
    training.setTrainingElements(elems);
    training = trainingService.saveTraining(context, training);

    // process participants

    List<TrainingParticipant> participants = training.getParticipants();
    for (TrainingParticipant tp : participants) {
      if (users == null || !users.contains(tp.getUser().getId()))
        trainingService.leaveTraining(context, training, tp.getUser());
    }


    if (users != null) {
      for (String uid : users) {
        if (!participants.stream().anyMatch(tp -> uid.equals(tp.getUser().getId()))) {
          trainingService.participate(context, training, userService.getUserById(context, uid));
        }
      }
    }

//    List<TrainingParticipant> participants = new ArrayList<>();
//    participants = participants.stream().filter(p -> users != null && users.contains(p.getUser().getId())).collect(Collectors.toList());
//    if (users != null) {
//      for (String uid: users) {
//        if (!participants.stream().anyMatch(p -> uid.equals(p.getUser().getId()))) {
//          TrainingParticipant tp = new TrainingParticipant(training, userService.getUserById(context, uid));
//          participants.add(tp);
////          participants.add(trainingParticipantService.save(context, tp));
//        }
//      }
//    }
//    training.setParticipants(participants);

    return ResponseEntity.ok(training);
  }

  @Override
  public Page<Training> searchTrainings(
     Principal principal,
     String oid,
     LocalDate from,
     LocalDate to,
     List<String> users,
     Pageable pageable)
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
