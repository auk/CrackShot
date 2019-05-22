package stx.shooterstatistic.jpa;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.User;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingRepositoryTest {

  private final static Logger log = LoggerFactory.getLogger(TrainingRepositoryTest.class);

  @Autowired
  OrganizationRepository organizationRepository;

  @Autowired
  TrainingRepository trainingRepository;

  @Autowired
  UserRepository userRepository;

  @Test
  public void testRepository() {
    User user1 = userRepository.save(new User("user 1"));
    User user2 = userRepository.save(new User("user 2"));
    User user3 = userRepository.save(new User("user 3"));

    Organization organization1 = organizationRepository.save(new Organization(user1.getId(), "org 1"));
    Organization organization2 = organizationRepository.save(new Organization(user2.getId(), "org 1"));

    Training training1 = new Training();
  }
}
