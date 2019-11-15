package stx.shooterstatistic.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.Stage;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

public interface TrainingStageApi {
  @PostMapping(value = "/training/{tid}/stage")
  ResponseEntity<Stage> createTrainingStage(
     @NotNull Principal principal,
     @PathVariable String tid,
     @RequestParam(required = false) List<String> elems,
     @RequestParam(required = false, defaultValue = "0") int shots,
     @RequestParam String name
  );

  @GetMapping(value = "/training/{tid}/stages")
  Page<Stage> getTrainingStages(
     @NotNull Principal principal,
     @PathVariable String tid,
     @PageableDefault(size = 50) Pageable pageable);

  @GetMapping(value = "/training/{tid}/stage/{sid}")
  ResponseEntity<Stage> getTrainingStage(@NotNull Principal principal, @PathVariable String tid, @PathVariable String sid);

  @DeleteMapping(value = "/training/{tid}/stage/{sid}")
  void deleteTrainingStage(@NotNull Principal principal, @PathVariable String tid, @PathVariable String sid);

  @PutMapping(value = "/training/{tid}/stage/{sid}")
  ResponseEntity<Stage> updateTrainingStage(
     @NotNull Principal principal,
     @PathVariable String tid,
     @PathVariable String sid,
     @RequestParam(required = false) List<String> elems,
     @RequestParam(required = false, defaultValue = "0") int shots,
     @RequestParam String name
  );
}
