package stx.shooterstatistic.jpa;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.model.*;

import java.time.LocalDate;
import java.util.Arrays;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingRepositoryTest {

  private final static Logger log = LoggerFactory.getLogger(TrainingRepositoryTest.class);

  @Autowired
  OrganizationRepository organizationRepository;

  @Autowired
  OrganizationMembershipRepository organizationMembershipRepository;

  @Autowired
  TrainingRepository trainingRepository;

  @Autowired
  TrainingParticipantRepository trainingParticipantRepository;

  @Autowired
  UserRepository userRepository;

  @Test
  public void testAddDeleteRepository() {
    Training training = new Training(LocalDate.now());
    training = trainingRepository.save(training);

    String id = training.getId();
    Assert.assertTrue(trainingRepository.existsById(id));
    trainingRepository.delete(training);
    Assert.assertFalse(trainingRepository.existsById(id));
  }

  @Test
  public void testRepository() {
    try {
      User user1 = userRepository.save(new User("user 1"));
      User user2 = userRepository.save(new User("user 2"));

      Organization organization1 = organizationRepository.save(new Organization(user1, "org 1"));
      Organization organization2 = organizationRepository.save(new Organization(user2, "org 1"));

      trainingRepository.save(new Training(LocalDate.now(), organization1));
      trainingRepository.save(new Training(LocalDate.now(), organization1));
      trainingRepository.save(new Training(LocalDate.now(), organization1));
      trainingRepository.save(new Training(LocalDate.now(), organization2));
      trainingRepository.save(new Training(LocalDate.now(), organization2));
      trainingRepository.save(new Training(LocalDate.now()));

      Page<Training> pageOrgs = trainingRepository.findByOrganization(organization1, Pageable.unpaged());
      Assert.assertEquals(3, pageOrgs.getTotalElements());

      pageOrgs = trainingRepository.findByOrganization(organization2, Pageable.unpaged());
      Assert.assertEquals(2, pageOrgs.getTotalElements());

      pageOrgs = trainingRepository.findByOrganization(null, Pageable.unpaged());
      Assert.assertEquals(1, pageOrgs.getTotalElements());
    } finally {
      trainingRepository.deleteAll();
      organizationMembershipRepository.deleteAll();
      organizationRepository.deleteAll();
      userRepository.deleteAll();
    }
  }

}