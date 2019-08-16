package stx.shooterstatistic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.Stage;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingElement;
import stx.shooterstatistic.services.IStageService;
import stx.shooterstatistic.services.ITrainingService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.TrainingElementService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController()
public class TrainingStageController {
  @Autowired private SecurityService securityService;
  @Autowired private IStageService stageService;
  @Autowired private ITrainingService trainingService;
  @Autowired private TrainingElementService trainingElementService;

  @PostMapping(value = "/training/{tid}/stage")
  public ResponseEntity<Stage> createTrainingStage(
          @NotNull Principal principal,
          @PathVariable String tid,
          @RequestParam(required = false) List<String> elems,
          @RequestParam(required = false, defaultValue = "0") int shots,
          @RequestParam String name
  ) {
    SecurityContext context = securityService.createContext(principal);

    List<TrainingElement> elements = new ArrayList<>();
    if (elems != null) {
      elems.forEach(id -> trainingElementService.find(id).ifPresent(elements::add));
    }

    Training training = trainingService.getTraining(context, tid);
    Stage stage = stageService.createStage(context, training, elements, shots);
    stage.setShots(shots);
    stage.setName(name);
    stage.setTime(LocalTime.now());
    stage = stageService.saveStage(context, stage);

    return new ResponseEntity<>(stage, HttpStatus.CREATED);
  }

  @GetMapping(value = "/training/{tid}/stages")
  public Page<Stage> getTrainingStages(
          @NotNull Principal principal,
          @PathVariable String tid,
          @PageableDefault(size = 50) Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);
    Training training = trainingService.getTraining(context, tid);
    return stageService.findStages(context, training, pageable);
  }

  @GetMapping(value = "/training/{tid}/stage/{sid}")
  public ResponseEntity<Stage> getTrainingStage(@NotNull Principal principal, @PathVariable String tid, @PathVariable String sid) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    return ResponseEntity.ok(stage);
  }

  @DeleteMapping(value = "/training/{tid}/stage/{sid}")
  public void deleteTrainingStage(@NotNull Principal principal, @PathVariable String tid, @PathVariable String sid) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    stageService.deleteStage(context, stage);
  }

  @PutMapping(value = "/training/{tid}/stage/{sid}")
  public ResponseEntity<Stage> updateTrainingStage(
          @NotNull Principal principal,
          @PathVariable String tid,
          @PathVariable String sid,
          @RequestParam(required = false) List<String> elems,
          @RequestParam(required = false, defaultValue = "0") int shots,
          @RequestParam String name
  ) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    stage.setName(name);
    stage.setTrainingElements(elems);
    stage.setShots(shots);
    stage = stageService.saveStage(context, stage);

    Training training = trainingService.getTraining(context, tid);
    List<TrainingElement> elements = new ArrayList<>();
    if (elems != null) {
      elems.forEach(id -> trainingElementService.find(id).ifPresent(elements::add));
    }
    trainingService.mergeTrainingElement(context, training, elements);

    return new ResponseEntity<>(stage, HttpStatus.OK);
  }
}
