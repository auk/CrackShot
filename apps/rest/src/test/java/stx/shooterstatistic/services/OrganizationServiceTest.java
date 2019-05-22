package stx.shooterstatistic.services;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganizationServiceTest {

  private final static Logger log = LoggerFactory.getLogger(OrganizationServiceTest.class);

  final String adminUsername = "admin@startext.ru";

  User adminUser;

  @Autowired
  OrganizationService organizationService;

  @Autowired
  SecurityService securityService;

  @Autowired
  UserService userService;

  @Before
  public void initData() {
    adminUser = userService.findUserByEmail(adminUsername).orElseGet(() -> {
      User u =userService.createUser("test-admin", adminUsername);
      log.info("Created test user: {}", u);
      return u;
    });
  }

  @Test
  public void testOrganization() {
    Organization org = organizationService.createOrganization(adminUser, "Test organization");
    Assert.assertNotNull(org);

    SecurityContext context = securityService.createContext(adminUser);
    Assert.assertNotNull(organizationService.getOrganization(context, org.getId()));

    organizationService.deleteOrganization(context, org.getId());
  }

  @Test(expected = ResourceNotFoundException.class)
  public void testGetNonExistingOrganization() {
    SecurityContext context = securityService.createContext(adminUser);
    organizationService.deleteOrganization(context, UUID.randomUUID().toString());
  }
}
