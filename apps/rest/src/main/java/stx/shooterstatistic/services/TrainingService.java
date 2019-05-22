package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.jpa.TrainingParticipantRepository;
import stx.shooterstatistic.jpa.TrainingRepository;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingParticipant;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class TrainingService {

  @Autowired
  TrainingRepository trainingRepository;

  @Autowired
  TrainingParticipantRepository trainingParticipantRepository;

  @NotNull
  public Training createTraining(@NotNull LocalDate date, @Null Organization organization, @Null List<User> users) {
    Training training = trainingRepository.save(new Training(date, organization));
    if (users != null)
      users.forEach(u -> joinTraining(training, u));
    return training;
  }

   public TrainingParticipant joinTraining(@NotNull Training training, @NotNull User user) {
     Objects.requireNonNull(training);
     Objects.requireNonNull(user);

     return trainingParticipantRepository
       .findByTrainingAndUser(training, user)
       .orElseGet(() -> trainingParticipantRepository.save(new TrainingParticipant(training, user)));
   }
}
