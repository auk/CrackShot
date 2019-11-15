package stx.shooterstatistic.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.model.Training;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface TrainingApi {

  @PostMapping(value = "/training")
  ResponseEntity<Training> createTraining(
     Principal principal,
     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) List<String> users,
     @RequestParam(required = false) List<String> elems,
     @RequestParam(required = false) Boolean participate,
     @RequestParam(required = false) Integer shots,
     @RequestParam(required = false) Integer cost);

  @GetMapping(value = "/training/{tid}")
  ResponseEntity<Training> getTraining(Principal principal, @PathVariable String tid);

  @DeleteMapping(value = "/training/{tid}")
  ResponseEntity<Training> deleteTraining(Principal principal, @PathVariable String tid);

  @PutMapping(value = "/training/{tid}")
  ResponseEntity<Training> updateTraining(
     Principal principal, @PathVariable String tid,
     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) List<String> users,
     @RequestParam(required = false) List<String> elems
  );

  @PostMapping(value = "/trainings/search")
  Page<Training> searchTrainings(
     Principal principal,
     @RequestParam(required = false) String oid,
     @RequestParam(required = false) LocalDate from,
     @RequestParam(required = false) LocalDate to,
     @RequestParam(required = false) List<String> users,
     @PageableDefault(size = 50, sort = { "date", "time" }, direction = Sort.Direction.DESC) Pageable pageable);
}
