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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.tests.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class OrganizationServiceTest {

  private final static Logger log = LoggerFactory.getLogger(OrganizationServiceTest.class);

  final String adminEmail = "admin@startext.ru";

  User adminUser;

  @Autowired
  OrganizationService organizationService;

  @Autowired
  SecurityService securityService;

  @Autowired
  UserService userService;

  @Autowired
  TestUtils testUtils;

  @Before
  public void initData() {
    adminUser = userService.findUserByEmail(adminEmail).orElseGet(() -> testUtils.createAdminUser());
  }

  @After
  public void clean() {
    SecurityContext context = securityService.createContext(adminUser);
    userService.deleteUser(context, adminUser);
  }

  @Test
  public void testOrganization() {
    Organization org = organizationService.createOrganization(adminUser, "Test organization");
    Assert.assertNotNull(org);

    SecurityContext context = securityService.createContext(adminUser);
    Assert.assertNotNull(organizationService.getOrganization(context, org.getId()));

    organizationService.deleteOrganization(context, org);
  }
}
