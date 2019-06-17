package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.TrainingElement;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.TrainingElementService;

import java.security.Principal;

@RestController
public class TrainingElementController {

  private final static Logger log = LoggerFactory.getLogger(TrainingElementController.class);

  @Autowired
  TrainingElementService trainingElementService;

  @Autowired
  SecurityService securityService;

  @PostMapping(value = "/trainingElement")
  public ResponseEntity<TrainingElement> createTrainingElement(Principal principal, @RequestParam String name) {
    SecurityContext context = securityService.createContext(principal);
    TrainingElement el = trainingElementService.create(context, name);
    return new ResponseEntity<>(el, HttpStatus.CREATED);
  }

  @DeleteMapping(value = "/trainingElement/{id}")
  public void deleteTrainingElement(Principal principal, @PathVariable String id) {
    SecurityContext context = securityService.createContext(principal);
    trainingElementService.delete(context, id);
  }

  @GetMapping(value = "/trainingElement/{id}")
  public ResponseEntity<TrainingElement> getTrainingElement(@PathVariable String id) {
    TrainingElement el = trainingElementService.get(id);
    return ResponseEntity.ok(el);
  }

  @GetMapping(value = "/trainingElements")
  public Page<TrainingElement> getAllTrainingElements(
     Principal principal,
     @PageableDefault(size = 50, sort = { "name" }, direction = Sort.Direction.ASC) Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);
    return trainingElementService.all(context, pageable);
  }
}
