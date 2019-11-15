package stx.shooterstatistic.services;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.enums.PowerFactor;
import stx.shooterstatistic.enums.Result;
import stx.shooterstatistic.interfaces.IScoreService;
import stx.shooterstatistic.model.StageResult;

import java.math.BigDecimal;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class ScoreServiceTest {

  @Autowired
  IScoreService scoreService;

  @Test
  public void testScoreMinor() {
    Assert.assertEquals(10, scoreService.calculateScore(PowerFactor.MINOR, Result.A, 2));
    Assert.assertEquals(9, scoreService.calculateScore(PowerFactor.MINOR, Result.C, 3));
    Assert.assertEquals(4, scoreService.calculateScore(PowerFactor.MINOR, Result.D, 4));
  }

  @Test
  public void testScoreMajor() {
    Assert.assertEquals(10, scoreService.calculateScore(PowerFactor.MAJOR, Result.A, 2));
    Assert.assertEquals(12, scoreService.calculateScore(PowerFactor.MAJOR, Result.C, 3));
    Assert.assertEquals(8, scoreService.calculateScore(PowerFactor.MAJOR, Result.D, 4));
  }

  private StageResult createStageResult() {
    StageResult result = new StageResult();
    result.setScore(Result.A, 7);
    result.setScore(Result.C, 3);
    result.setScore(Result.D, 1);
    result.setScore(Result.NO_SHOOT, 1);
    result.setScore(Result.PENALTY, 1);
    return result;
  }

  @Test
  public void testStageScore() {
    StageResult result = createStageResult();
    Assert.assertEquals(25, scoreService.calculateScore(PowerFactor.MINOR, result));
    Assert.assertEquals(29, scoreService.calculateScore(PowerFactor.MAJOR, result));
  }

  @Test
  public void testStageScoreMinor() {
    StageResult result = createStageResult();
    Assert.assertEquals(25, scoreService.calculateScore(PowerFactor.MINOR, result));

    result.setDuration(5.255);
    Assert.assertEquals(new BigDecimal("4.757"), scoreService.calculateHitFactor(PowerFactor.MINOR, result));

    result.setDuration(1.333);
    Assert.assertEquals(new BigDecimal("18.755"), scoreService.calculateHitFactor(PowerFactor.MINOR, result));

    result.setDuration(2.831);
    Assert.assertEquals(new BigDecimal("8.831"), scoreService.calculateHitFactor(PowerFactor.MINOR, result));
  }

  @Test
  public void testStageScoreMajor() {
    StageResult result = createStageResult();
    Assert.assertEquals(29, scoreService.calculateScore(PowerFactor.MAJOR, result));

    result.setDuration(5.255);
    Assert.assertEquals(new BigDecimal("5.519"), scoreService.calculateHitFactor(PowerFactor.MAJOR, result));

    result.setDuration(1.333);
    Assert.assertEquals(new BigDecimal("21.755"), scoreService.calculateHitFactor(PowerFactor.MAJOR, result));

    result.setDuration(2.831);
    Assert.assertEquals(new BigDecimal("10.244"), scoreService.calculateHitFactor(PowerFactor.MAJOR, result));
  }
}
