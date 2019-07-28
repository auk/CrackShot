package stx.shooterstatistic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.Stage;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingElement;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.StageService;
import stx.shooterstatistic.services.TrainingElementService;
import stx.shooterstatistic.services.TrainingService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController()
public class TrainingStageController {
  @Autowired private SecurityService securityService;
  @Autowired private StageService stageService;
  @Autowired private TrainingService trainingService;
  @Autowired private TrainingElementService trainingElementService;

  @PostMapping(value = "/training/{tid}/stage")
  public ResponseEntity<Stage> createTrainingStage(@NotNull Principal principal, @PathVariable String tid, @RequestParam(required = false) List<String> elems) {
    SecurityContext context = securityService.createContext(principal);

    List<TrainingElement> elements = new ArrayList<>();
    if (elems != null) {
      elems.forEach(id -> trainingElementService.find(id).ifPresent(elements::add));
    }

    Training training = trainingService.getTraining(context, tid);
    Stage stage = stageService.createStage(context, training, elements);
    return new ResponseEntity<>(stage, HttpStatus.CREATED);
  }

  @GetMapping(value = "/training/{tid}/stage/{sid}")
  public ResponseEntity<Stage> getStage(@NotNull Principal principal, @PathVariable String tid, @PathVariable String sid) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    return ResponseEntity.ok(stage);
  }

  @DeleteMapping(value = "/training/{tid}/stage/{sid}")
  public void deleteStage(@NotNull Principal principal, @PathVariable String tid, @PathVariable String sid) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    stageService.deleteStage(context, stage);
  }
}
