package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.TrainingService;
import stx.shooterstatistic.services.UserService;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TrainingController {

  private final static Logger log = LoggerFactory.getLogger(TrainingController.class);

  @Autowired
  OrganizationService organizationService;

  @Autowired
  SecurityService securityService;

  @Autowired
  TrainingService trainingService;

  @Autowired
  UserService userService;

  @PostMapping(value = "/training")
  public ResponseEntity<Training> createTraining(
     Principal principal,
     @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
     @RequestParam String oid,
     @RequestParam List<String> users) {

    User user = userService.findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
    SecurityContext context = securityService.createContext(user);

    Organization organization = null;
    if (oid != null) {
      organization = organizationService.getOrganization(context, oid);
    }

    List<User> participants = new ArrayList<>();
    if (user != null) {
      users.forEach(uid -> userService.findUserById(context, uid).ifPresent(participants::add));
    }

    Training training = trainingService.createTraining(context, date, organization, participants);
    return new ResponseEntity<>(training, HttpStatus.CREATED);
  }
}
