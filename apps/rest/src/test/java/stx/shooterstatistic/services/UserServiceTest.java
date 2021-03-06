package stx.shooterstatistic.services;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.tests.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class UserServiceTest {

  private final static String EMAIL = "test@startext.ru";
  private final static String NAME = "Test user";

  @Autowired
  UserService userService;

  @Autowired
  SecurityService securityService;

  @Autowired
  TestUtils testUtils;

  @Test
  public void createAndDeleteUser() {
    // given
    User user = userService.createUser(NAME, EMAIL);
    Assert.assertNotNull(user);
    Assert.assertTrue(userService.findUserByEmail(EMAIL).isPresent());

    User adminUser = testUtils.createAdminUser();
    SecurityContext securityContext = securityService.createContext(adminUser);

    // when
    userService.deleteUser(securityContext, user);

    // then
    Assert.assertFalse(userService.findUserByEmail(EMAIL).isPresent());
  }
}
