package stx.shooterstatistic.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.TrainingElement;

import javax.validation.constraints.NotNull;
import java.security.Principal;

public interface TrainingElementApi {
  @PostMapping(value = "/trainingElement")
  ResponseEntity<TrainingElement> createTrainingElement(Principal principal, @RequestParam String name);

  @DeleteMapping(value = "/trainingElement/{id}")
  void deleteTrainingElement(Principal principal, @PathVariable String id);

  @GetMapping(value = "/trainingElement/{id}")
  ResponseEntity<TrainingElement> getTrainingElement(@PathVariable String id);

  @PutMapping(value = "/trainingElement/{id}")
  ResponseEntity<TrainingElement> updateTrainingElement(Principal principal, @PathVariable String id, @NotNull @RequestParam String name);

  @GetMapping(value = "/trainingElements")
  Page<TrainingElement> getAllTrainingElements(@PageableDefault(size = 50, sort = { "name" }, direction = Sort.Direction.ASC) Pageable pageable);
}
