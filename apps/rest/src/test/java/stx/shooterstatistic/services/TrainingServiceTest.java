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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.jpa.*;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.tests.TestUtils;
import stx.shooterstatistic.util.Definable;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class TrainingServiceTest {

  private final static Logger log = LoggerFactory.getLogger(OrganizationServiceTest.class);

  @Autowired private OrganizationRepository organizationRepository;
  @Autowired private OrganizationMembershipRepository organizationMembershipRepository;
  @Autowired private TrainingRepository trainingRepository;
  @Autowired private TrainingParticipantRepository trainingParticipantRepository;
  @Autowired private OrganizationService organizationService;
  @Autowired private SecurityService securityService;
  @Autowired private TrainingService trainingService;
  @Autowired private UserService userService;
  @Autowired private UserRepository userRepository;

  @Autowired private TestUtils testUtils;

  private final String adminEmail = "admin@startext.ru", fakeEmail = "fake@startext.ru";
  User adminUser, fakeUser;
  List<User> users;

  LocalDate today = LocalDate.now();
  LocalDate yesterday = LocalDate.now().minusDays(1);
  LocalDate tomorrow = LocalDate.now().plusDays(1);

  @Before
  public void initData() {
    trainingParticipantRepository.deleteAll();
    trainingRepository.deleteAll();
    organizationMembershipRepository.deleteAll();
    organizationRepository.deleteAll();
    userRepository.deleteAll();

    adminUser = userService.findUserByEmail(adminEmail).orElseGet(() -> testUtils.createAdminUser());
    fakeUser = userService.findUserByEmail(fakeEmail).orElseGet(() -> userService.saveUser("test-fake", fakeEmail));
    users = new ArrayList<User>() {{
      add(userService.saveUser("User 1"));
      add(userService.saveUser("User 2"));
      add(userService.saveUser("User 3"));
    }};
  }

  @After
  public void clean() {
    final SecurityContext context = securityService.createContext(adminUser);

    trainingParticipantRepository.deleteAll();
    trainingRepository.deleteAll();
    organizationMembershipRepository.deleteAll();
    organizationRepository.deleteAll();
    userRepository.deleteAll();
  }

  @Test
  public void testAddDeleteTraining() {
    SecurityContext context = securityService.createContext(adminUser);

    Organization organization = organizationService.createOrganization(adminUser, "TrainingServiceTest organization");
    Training training = trainingService.createTraining(context, LocalDate.now(), null, organization, users);

    users.forEach(u -> Assert.assertTrue(trainingService.isParticipated(context, training, u)));
    Assert.assertFalse(trainingService.isParticipated(context, training, adminUser));
    Assert.assertFalse(trainingService.isParticipated(context, training, fakeUser));

    users.forEach(u -> trainingService.leaveTraining(context, training, u));
    users.forEach(u -> Assert.assertFalse(trainingService.isParticipated(context, training, u)));

    trainingService.deleteTraining(context, training);
    organizationService.deleteOrganization(context, organization);
  }

  private long getTrainingsCount(SecurityContext context, @NotNull TrainingSearchCriteria criteria) {
    Page<Training> trainings = trainingService.findTrainings(context, criteria, Pageable.unpaged());
    return trainings.getTotalElements();
  }

  @Test
  public void testSearch() {
    SecurityContext adminContext = securityService.createContext(adminUser);

    Organization organization1 = organizationService.createOrganization(adminUser, "TrainingServiceTest organization 1");
    Organization organization2 = organizationService.createOrganization(adminUser, "TrainingServiceTest organization 2");

    trainingService.createTraining(adminContext, yesterday, null, organization1, users);
    trainingService.createTraining(adminContext, today, null, organization1, Arrays.asList(users.get(0), users.get(1)));
    trainingService.createTraining(adminContext, tomorrow, null, organization1, Arrays.asList(users.get(0), users.get(2)));

    trainingService.createTraining(adminContext, yesterday, null, null, Collections.singletonList(users.get(2)));
    trainingService.createTraining(adminContext, today, null, null, Collections.singletonList(users.get(1)));
    trainingService.createTraining(adminContext, tomorrow, null, null, Collections.singletonList(users.get(0)));

    trainingService.createTraining(adminContext, yesterday, null, organization2, Collections.singletonList(users.get(2)));
    trainingService.createTraining(adminContext, today, null, organization2, Collections.singletonList(users.get(2)));
    trainingService.createTraining(adminContext, tomorrow, null, organization2, Arrays.asList(users.get(0), users.get(1)));

    // stage 1: check by organization (admin)
    TrainingSearchCriteria searchCriteria = new TrainingSearchCriteria();
    Assert.assertEquals(9, getTrainingsCount(adminContext, searchCriteria));

    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setOrganization(Definable.of(organization1.getId()));
    Assert.assertEquals(3, getTrainingsCount(adminContext, searchCriteria));

    searchCriteria.setOrganization(Definable.of(organization2.getId()));
    Assert.assertEquals(3, getTrainingsCount(adminContext, searchCriteria));

    searchCriteria.setOrganization(Definable.empty());
    Assert.assertEquals(3, getTrainingsCount(adminContext, searchCriteria));

    // stage 2: check by date (admin)
    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setDateFrom(today);
    Assert.assertEquals(6, getTrainingsCount(adminContext, searchCriteria));

    searchCriteria.setDateTo(today);
    Assert.assertEquals(3, getTrainingsCount(adminContext, searchCriteria));

    // stage 3: check by users (admin)
    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setUsers(Collections.singletonList(users.get(0).getId()));
    Assert.assertEquals(5, getTrainingsCount(adminContext, searchCriteria));

    searchCriteria.setUsers(Collections.singletonList(users.get(1).getId()));
    Assert.assertEquals(4, getTrainingsCount(adminContext, searchCriteria));

    searchCriteria.setUsers(Arrays.asList(users.get(1).getId(), users.get(2).getId()));
    Assert.assertEquals(8, getTrainingsCount(adminContext, searchCriteria));

    SecurityContext userContext1 = securityService.createContext(users.get(0));
    SecurityContext userContext2 = securityService.createContext(users.get(1));
    SecurityContext userContext3 = securityService.createContext(users.get(2));
    SecurityContext userContextFake = securityService.createContext(fakeUser);

    // stage 4: check by organizations (user)
    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setOrganization(Definable.of(organization1.getId()));
    Assert.assertEquals(3, getTrainingsCount(userContext1, searchCriteria));
    Assert.assertEquals(2, getTrainingsCount(userContext2, searchCriteria));
    Assert.assertEquals(2, getTrainingsCount(userContext3, searchCriteria));
    Assert.assertEquals(0, getTrainingsCount(userContextFake, searchCriteria));

    searchCriteria.setOrganization(Definable.of(organization2.getId()));
    Assert.assertEquals(1, getTrainingsCount(userContext1, searchCriteria));
    Assert.assertEquals(1, getTrainingsCount(userContext2, searchCriteria));
    Assert.assertEquals(2, getTrainingsCount(userContext3, searchCriteria));
    Assert.assertEquals(0, getTrainingsCount(userContextFake, searchCriteria));

    searchCriteria.setOrganization(Definable.empty());
    Assert.assertEquals(1, getTrainingsCount(userContext1, searchCriteria));
    Assert.assertEquals(1, getTrainingsCount(userContext2, searchCriteria));
    Assert.assertEquals(1, getTrainingsCount(userContext3, searchCriteria));
    Assert.assertEquals(0, getTrainingsCount(userContextFake, searchCriteria));

    // stage 5: search by user globally
    searchCriteria = new TrainingSearchCriteria();
    Assert.assertEquals(5, getTrainingsCount(userContext1, searchCriteria));
    Assert.assertEquals(4, getTrainingsCount(userContext2, searchCriteria));
    Assert.assertEquals(5, getTrainingsCount(userContext3, searchCriteria));
    Assert.assertEquals(0, getTrainingsCount(userContextFake, searchCriteria));
    Assert.assertEquals(9, getTrainingsCount(adminContext, searchCriteria));

    Assert.assertEquals(5, getTrainingsCount(userContext1, null));
    Assert.assertEquals(4, getTrainingsCount(userContext2, null));
    Assert.assertEquals(5, getTrainingsCount(userContext3, null));
    Assert.assertEquals(9, getTrainingsCount(adminContext, null));
  }
}
