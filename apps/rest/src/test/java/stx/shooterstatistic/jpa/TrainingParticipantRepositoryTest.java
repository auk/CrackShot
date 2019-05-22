package stx.shooterstatistic.jpa;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingParticipant;
import stx.shooterstatistic.model.User;

import java.time.LocalDate;
import java.util.Arrays;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingParticipantRepositoryTest {

  private final static Logger log = LoggerFactory.getLogger(TrainingParticipantRepositoryTest.class);

  @Autowired OrganizationRepository organizationRepository;
  @Autowired OrganizationMembershipRepository organizationMembershipRepository;
  @Autowired TrainingRepository trainingRepository;
  @Autowired TrainingParticipantRepository trainingParticipantRepository;
  @Autowired UserRepository userRepository;

  @Test
  public void testRepository() {
    try {
      User user1 = userRepository.save(new User("user 1"));
      User user2 = userRepository.save(new User("user 2"));
      User user3 = userRepository.save(new User("user 3"));
      log.info("Users 1: {}", user1);
      log.info("Users 2: {}", user2);
      log.info("Users 3: {}", user3);

      Organization organization1 = organizationRepository.save(new Organization(user1, "org 1"));
      Organization organization2 = organizationRepository.save(new Organization(user2, "org 1"));

      final Training training1 = trainingRepository.save(new Training(LocalDate.now(), organization1));
      Arrays.asList(user1, user2).forEach(u -> trainingParticipantRepository.save(new TrainingParticipant(training1, u)));

      final Training training2 = trainingRepository.save(new Training(LocalDate.now(), organization1));
      Arrays.asList(user1, user2).forEach(u -> trainingParticipantRepository.save(new TrainingParticipant(training2, u)));

      final Training training3 = trainingRepository.save(new Training(LocalDate.now(), organization1));
      Arrays.asList(user1, user3).forEach(u -> trainingParticipantRepository.save(new TrainingParticipant(training3, u)));

      final Training training4 = trainingRepository.save(new Training(LocalDate.now(), organization2));
      Arrays.asList(user2, user3).forEach(u -> trainingParticipantRepository.save(new TrainingParticipant(training4, u)));

      final Training training5 = trainingRepository.save(new Training(LocalDate.now(), organization2));
      Arrays.asList(user3).forEach(u -> trainingParticipantRepository.save(new TrainingParticipant(training5, u)));

      // training without any organization
      final Training training6 = trainingRepository.save(new Training(LocalDate.now()));
      Arrays.asList(user3).forEach(u -> trainingParticipantRepository.save(new TrainingParticipant(training6, u)));

      log.info("All participants:");
      trainingParticipantRepository.findAll().forEach(p -> log.info("- {}", p));

      Page<Training> pageOrgs = trainingRepository.findByOrganization(organization1, Pageable.unpaged());
      Assert.assertEquals(3, pageOrgs.getTotalElements());

      pageOrgs = trainingRepository.findByOrganization(organization2, Pageable.unpaged());
      Assert.assertEquals(2, pageOrgs.getTotalElements());

      // 1: search by users

      Page<TrainingParticipant> trainingParticipants = trainingParticipantRepository.findByUser(user1, Pageable.unpaged());
      Assert.assertEquals(3, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByUser(user2, Pageable.unpaged());
      Assert.assertEquals(3, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByUser(user3, Pageable.unpaged());
      Assert.assertEquals(4, trainingParticipants.getTotalElements());

      // 2: search by trainings

      trainingParticipants = trainingParticipantRepository.findByTraining(training1, Pageable.unpaged());
      Assert.assertEquals(2, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByTraining(training2, Pageable.unpaged());
      Assert.assertEquals(2, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByTraining(training3, Pageable.unpaged());
      Assert.assertEquals(2, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByTraining(training4, Pageable.unpaged());
      Assert.assertEquals(2, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByTraining(training5, Pageable.unpaged());
      Assert.assertEquals(1, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByTraining(training6, Pageable.unpaged());
      Assert.assertEquals(1, trainingParticipants.getTotalElements());

      // 3: search by organization

      trainingParticipants = trainingParticipantRepository.findByOrganization(organization1, Pageable.unpaged());
      Assert.assertEquals(6, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByOrganization(organization2, Pageable.unpaged());
      Assert.assertEquals(3, trainingParticipants.getTotalElements());

      trainingParticipants = trainingParticipantRepository.findByOrganization(null, Pageable.unpaged());
      Assert.assertEquals(1, trainingParticipants.getTotalElements());

    } finally {
      trainingParticipantRepository.deleteAll();
      trainingRepository.deleteAll();
      organizationMembershipRepository.deleteAll();
      organizationRepository.deleteAll();
      userRepository.deleteAll();
    }
  }
}
