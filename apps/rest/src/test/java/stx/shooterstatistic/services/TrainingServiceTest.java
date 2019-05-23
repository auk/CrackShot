package stx.shooterstatistic.services;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.jpa.OrganizationMembershipRepository;
import stx.shooterstatistic.jpa.OrganizationRepository;
import stx.shooterstatistic.jpa.TrainingParticipantRepository;
import stx.shooterstatistic.jpa.TrainingRepository;
import stx.shooterstatistic.model.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingServiceTest {

  private final static Logger log = LoggerFactory.getLogger(OrganizationServiceTest.class);

  @Autowired
  OrganizationRepository organizationRepository;

  @Autowired
  OrganizationMembershipRepository organizationMembershipRepository;

  @Autowired TrainingRepository trainingRepository;
  @Autowired
  TrainingParticipantRepository trainingParticipantRepository;

  @Autowired OrganizationService organizationService;
  @Autowired SecurityService securityService;
  @Autowired TrainingService trainingService;
  @Autowired UserService userService;

  final String adminUsername = "admin@startext.ru", fakeUsername = "fake@startext.ru";
  User adminUser, fakeUser;
  List<User> users;

  LocalDate today = LocalDate.now();
  LocalDate yesterday = LocalDate.now().minusDays(1);
  LocalDate tommorow = LocalDate.now().plusDays(1);

  @Before
  public void initData() {
    trainingParticipantRepository.deleteAll();
    trainingRepository.deleteAll();
    organizationMembershipRepository.deleteAll();
    organizationRepository.deleteAll();

    adminUser = userService.findUserByEmail(adminUsername).orElseGet(() -> userService.createUser("test-admin", adminUsername));
    fakeUser = userService.findUserByEmail(fakeUsername).orElseGet(() -> userService.createUser("test-fake", fakeUsername));
    users = new ArrayList<User>() {{
      add(userService.createUser("User 1"));
      add(userService.createUser("User 2"));
      add(userService.createUser("User 3"));
    }};
  }

//  @After
  public void clean() {
    final SecurityContext context = securityService.createContext(adminUser);

    trainingParticipantRepository.deleteAll();
    trainingRepository.deleteAll();
    organizationMembershipRepository.deleteAll();
    organizationRepository.deleteAll();

    users.forEach(u -> userService.deleteUser(context, u));
    userService.deleteUser(context, fakeUser);
    userService.deleteUser(context, adminUser);
  }

//  @Test
  public void testAddDeleteTraining() {
    SecurityContext context = securityService.createContext(adminUser);

    Organization organization = organizationService.createOrganization(adminUser, "TrainingServiceTest organization");
    Training training = trainingService.createTraining(context, LocalDate.now(), organization, users);

    users.forEach(u -> Assert.assertTrue(trainingService.isParticipated(context, training, u)));
    Assert.assertFalse(trainingService.isParticipated(context, training, adminUser));
    Assert.assertFalse(trainingService.isParticipated(context, training, fakeUser));

    users.forEach(u -> trainingService.leaveTraining(context, training, u));
    users.forEach(u -> Assert.assertFalse(trainingService.isParticipated(context, training, u)));

    trainingService.deleteTraining(context, training);
    organizationService.deleteOrganization(context, organization);
  }

  @Test
  public void testSearch() {
    SecurityContext context = securityService.createContext(adminUser);

    Organization organization1 = organizationService.createOrganization(adminUser, "TrainingServiceTest organization 1");
    Organization organization2 = organizationService.createOrganization(adminUser, "TrainingServiceTest organization 2");

    trainingService.createTraining(context, yesterday, organization1, users);
    trainingService.createTraining(context, today, organization1, Arrays.asList(users.get(0), users.get(1)));
    trainingService.createTraining(context, tommorow, organization1, Arrays.asList(users.get(0), users.get(2)));

    trainingService.createTraining(context, yesterday, null, Collections.singletonList(users.get(2)));
    trainingService.createTraining(context, today, null, Collections.singletonList(users.get(1)));
    trainingService.createTraining(context, tommorow, null, Collections.singletonList(users.get(0)));

    trainingService.createTraining(context, yesterday, organization2, Collections.singletonList(users.get(2)));
    trainingService.createTraining(context, today, organization2, Collections.singletonList(users.get(2)));
    trainingService.createTraining(context, tommorow, organization2, Arrays.asList(users.get(0), users.get(1)));

    TrainingSearchCriteria searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setOrganization(organization1.getId());

    Page<Training> trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertNotNull(trainings);

    log.info("trainings: {}", trainings.getContent());

    Assert.assertEquals(1, trainings.getTotalElements());
  }
}
