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
import stx.shooterstatistic.util.Definable;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

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

    // stage 1: check by organization
    TrainingSearchCriteria searchCriteria = new TrainingSearchCriteria();
    Page<Training> trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(9, trainings.getTotalElements());

    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setOrganization(Definable.of(organization1.getId()));
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(3, trainings.getTotalElements());

    searchCriteria.setOrganization(Definable.of(organization2.getId()));
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(3, trainings.getTotalElements());

    searchCriteria.setOrganization(Definable.empty());
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(3, trainings.getTotalElements());

    // stage 2: check by date
    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setDateFrom(today);
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(6, trainings.getTotalElements());

    searchCriteria.setDateTo(today);
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(3, trainings.getTotalElements());

    // stage 3: check by users
    searchCriteria = new TrainingSearchCriteria();
    searchCriteria.setUsers(Collections.singletonList(users.get(0).getId()));
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(5, trainings.getTotalElements());

    searchCriteria.setUsers(Collections.singletonList(users.get(1).getId()));
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(4, trainings.getTotalElements());

    searchCriteria.setUsers(Arrays.asList(users.get(1).getId(), users.get(2).getId()));
    trainings = trainingService.findTrainings(context, searchCriteria, Pageable.unpaged());
    Assert.assertEquals(8, trainings.getTotalElements());
  }

  @Test
  public void testOptional() {
    Optional<String> o1 = Optional.ofNullable(null);
    Optional<String> o2 = Optional.empty();
    Assert.assertEquals(o1, o2);
  }
}
