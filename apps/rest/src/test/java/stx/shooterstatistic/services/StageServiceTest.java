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
import stx.shooterstatistic.interfaces.ISecurityService;
import stx.shooterstatistic.interfaces.IStageService;
import stx.shooterstatistic.interfaces.ITrainingElementService;
import stx.shooterstatistic.interfaces.ITrainingService;
import stx.shooterstatistic.jpa.TrainingElementRepository;
import stx.shooterstatistic.jpa.TrainingRepository;
import stx.shooterstatistic.jpa.TrainingStageRepository;
import stx.shooterstatistic.model.*;
import stx.shooterstatistic.tests.TestUtils;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class StageServiceTest {
  private static final Logger log = LoggerFactory.getLogger(StageServiceTest.class);

  @Autowired private ISecurityService securityService;
  @Autowired private IStageService stageService;
  @Autowired private ITrainingService trainingService;
  @Autowired private ITrainingElementService trainingElementService;

  @Autowired private TestUtils testUtils;

  @Autowired TrainingRepository trainingRepository;
  @Autowired TrainingElementRepository trainingElementRepository;
  @Autowired
  TrainingStageRepository trainingStageRepository;

  User adminUser;

  @Before
  public void initData() {
    adminUser = testUtils.getGlobalAdminUser();
    removeData();

    trainingElementRepository.save(new TrainingElement(UUID.randomUUID().toString()));
    log.info("Training elements: {}", trainingElementRepository.findAll());
  }

  @After
  public void removeData() {
    trainingStageRepository.deleteAll();
    trainingRepository.deleteAll();
  }

  @Test
  public void createStage() {
    final SecurityContext context = securityService.createContext(adminUser);

    Training training = trainingService.createTraining(context, LocalDate.now(), LocalTime.now(), null, null, Collections.emptyList());
    Page<TrainingElement> pageElements = trainingElementService.all(Pageable.unpaged());

    Stage stage = stageService.createStage(context, training, pageElements.getContent(), 10);
    Assert.assertNotNull(stage);
    Assert.assertNotNull(stage.getTraining());
    Assert.assertEquals(training.getId(), stage.getTraining().getId());

    Assert.assertTrue(stageService.findStageById(context, stage.getId()).isPresent());
    Assert.assertEquals(1, stageService.findStages(context, training, Pageable.unpaged()).getTotalElements());
  }

  @Test
  public void deleteStage() {
    final SecurityContext context = securityService.createContext(adminUser);
    Training training = trainingService.createTraining(context, LocalDate.now(), LocalTime.now(), null, null, Collections.emptyList());
    Page<TrainingElement> pageElements = trainingElementService.all(Pageable.unpaged());

    Stage stage = stageService.createStage(context, training, pageElements.getContent(), 10);
    Assert.assertTrue(stageService.findStageById(context, stage.getId()).isPresent());

    stageService.deleteStage(context, stage);
    Assert.assertFalse(stageService.findStageById(context, stage.getId()).isPresent());
  }
}
