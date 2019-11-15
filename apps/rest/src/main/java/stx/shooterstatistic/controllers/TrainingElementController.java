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
import stx.shooterstatistic.rest.TrainingElementApi;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.TrainingElementService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Objects;

@RestController
public class TrainingElementController implements TrainingElementApi {

  private static final Logger log = LoggerFactory.getLogger(TrainingElementController.class);

  @Autowired
  TrainingElementService trainingElementService;

  @Autowired
  SecurityService securityService;

  @Override
  public ResponseEntity<TrainingElement> createTrainingElement(Principal principal, String name) {
    SecurityContext context = securityService.createContext(principal);
    TrainingElement el = trainingElementService.create(context, name);
    return new ResponseEntity<>(el, HttpStatus.CREATED);
  }

  @Override
  public void deleteTrainingElement(Principal principal, String id) {
    SecurityContext context = securityService.createContext(principal);
    trainingElementService.delete(context, id);
  }

  @Override
  public ResponseEntity<TrainingElement> getTrainingElement(String id) {
    TrainingElement el = trainingElementService.get(id);
    return ResponseEntity.ok(el);
  }

  @Override
  public ResponseEntity<TrainingElement> updateTrainingElement(Principal principal, String id, @NotNull String name) {
    Objects.requireNonNull(name);

    TrainingElement el = trainingElementService.get(id);
    el.setName(name);

    SecurityContext context = securityService.createContext(principal);
    el = trainingElementService.save(context, el);
    return ResponseEntity.ok(el);
  }

  @Override
  public Page<TrainingElement> getAllTrainingElements(Pageable pageable) {
    return trainingElementService.all(pageable);
  }
}
