package stx.shooterstatistic.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import stx.shooterstatistic.model.TrainingParticipant;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

public interface TrainingParticipantApi {
  @PostMapping(value = "/user/trainings")
  Page<TrainingParticipant> searchCurrentUserTrainingParticipants(
          @NotNull Principal principal,
          @RequestParam(required = false) List<String> orgs,
          @RequestParam(required = false) LocalDate from,
          @RequestParam(required = false) LocalDate to,
          @PageableDefault(size = 50, sort = { "date", "time" }, direction = Sort.Direction.DESC) Pageable pageable);

  @PostMapping(value = "/user/{uid}/trainings")
  Page<TrainingParticipant> searchTrainingParticipants(
          @NotNull Principal principal,
          @PathVariable String uid,
          @RequestParam(required = false)List<String> orgs,
          @RequestParam(required = false) LocalDate from,
          @RequestParam(required = false) LocalDate to,
          @PageableDefault(size = 50, sort = { "date" }, direction = Sort.Direction.DESC) Pageable pageable);
}
