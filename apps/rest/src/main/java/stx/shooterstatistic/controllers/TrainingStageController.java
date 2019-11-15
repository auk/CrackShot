package stx.shooterstatistic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.Stage;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingElement;
import stx.shooterstatistic.rest.TrainingStageApi;
import stx.shooterstatistic.interfaces.IStageService;
import stx.shooterstatistic.interfaces.ITrainingService;
import stx.shooterstatistic.interfaces.ISecurityService;
import stx.shooterstatistic.interfaces.ITrainingElementService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController()
public class TrainingStageController implements TrainingStageApi {
  @Autowired private ISecurityService securityService;
  @Autowired private IStageService stageService;
  @Autowired private ITrainingService trainingService;
  @Autowired private ITrainingElementService trainingElementService;

  @Override
  public ResponseEntity<Stage> createTrainingStage(@NotNull Principal principal, String tid, List<String> elems, int shots, String name) {
    SecurityContext context = securityService.createContext(principal);

    List<TrainingElement> elements = new ArrayList<>();
    if (elems != null) {
      elems.forEach(id -> trainingElementService.find(id).ifPresent(elements::add));
    }

    Training training = trainingService.getTraining(context, tid);
    Stage stage = stageService.createStage(context, training, elements, shots);
    stage.setShots(shots);
    stage.setName(name);
    stage = stageService.saveStage(context, stage);

    return new ResponseEntity<>(stage, HttpStatus.CREATED);
  }

  @Override
  public Page<Stage> getTrainingStages(@NotNull Principal principal, String tid, Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);
    Training training = trainingService.getTraining(context, tid);
    return stageService.findStages(context, training, pageable);
  }

  @Override
  public ResponseEntity<Stage> getTrainingStage(@NotNull Principal principal, String tid, String sid) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    return ResponseEntity.ok(stage);
  }

  @Override
  public void deleteTrainingStage(@NotNull Principal principal, String tid, String sid) {
    SecurityContext context = securityService.createContext(principal);
    Stage stage = stageService.getStage(context, sid);
    stageService.deleteStage(context, stage);
  }

  @Override
  public ResponseEntity<Stage> updateTrainingStage(@NotNull Principal principal, String tid, String sid, List<String> elems, int shots, String name) {
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
