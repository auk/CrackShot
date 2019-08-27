package stx.shooterstatistic.graphql;

import graphql.ExecutionResult;
import graphql.GraphQL;
import org.apache.commons.jxpath.JXPathContext;
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
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;
import stx.shooterstatistic.tests.TestUtils;

import java.time.LocalDate;
import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class QueryTest {

  private static final Logger log = LoggerFactory.getLogger(QueryTest.class);

  @Autowired OrganizationService organizationService;
  @Autowired UserService userService;
  @Autowired SecurityService securityService;
  @Autowired TestUtils testUtils;

  private GraphQL graphQL;

  private User user1, user2, adminUser;
  private SecurityContext securityContext1, securityContext2, adminSecurityContext;
  private Organization org1, org2;

  private static final LocalDate today = LocalDate.now();

  @Before
  public void initGraphQL() {
    if (graphQL == null) {
      this.graphQL = GraphQL.newGraphQL(Schema.getShchema()).build();
    }
    Assert.assertNotNull(this.graphQL);
  }

  @Before
  public void initData() {
    user1 = user1 == null ? userService.createUser(UUID.randomUUID().toString()) : user1;
    user2 = user2 == null ? userService.createUser(UUID.randomUUID().toString()) : user2;
    adminUser = adminUser == null ? userService.findUserByEmail(testUtils.getGlobalAdminEmail()).orElseGet(() -> testUtils.createGlobalAdminUser()) : adminUser;

    org1 = organizationService.createOrganization(user1, "Org 1");
    org2 = organizationService.createOrganization(user2, "Org 2");

    securityContext1 = securityService.createContext(user1);
    securityContext2 = securityService.createContext(user2);
    adminSecurityContext = securityService.createContext(adminUser);
  }

  Map<String, Object> createSecurityContextMap(SecurityContext securityContext) {
    Map<String, Object> context = new HashMap<>();
    context.put("securityContext", securityContext);
    return context;
  }

  @Test
  public void loadOrganization1() {
    String query = String.format("{ organization(id: \"%s\") { id name } }", org1.getId());
    ExecutionResult executionResult = GraphQLHelpers.executeQuery(graphQL, createSecurityContextMap(adminSecurityContext), query);

    JXPathContext pathContext = JXPathContext.newContext(executionResult.getData());
    Assert.assertEquals(org1.getId(), pathContext.getValue("organization/id", String.class));
    Assert.assertEquals(org1.getName(), pathContext.getValue("organization/name", String.class));
  }

  @Test
  public void loadOrganization2() {
    String query = String.format("{ organization(id: \"%s\") { id name } }", org2.getId());
    ExecutionResult executionResult = GraphQLHelpers.executeQuery(graphQL, createSecurityContextMap(adminSecurityContext), query);

    JXPathContext pathContext = JXPathContext.newContext(executionResult.getData());
    Assert.assertEquals(org2.getId(), pathContext.getValue("organization/id", String.class));
    Assert.assertEquals(org2.getName(), pathContext.getValue("organization/name", String.class));
  }

  @Test
  public void loadUser1() {
    String query = String.format("{ user(id: \"%s\") { id username roles } }", user1.getId());
    ExecutionResult executionResult = GraphQLHelpers.executeQuery(graphQL, createSecurityContextMap(adminSecurityContext), query);

    JXPathContext pathContext = JXPathContext.newContext(executionResult.getData());
    Assert.assertEquals(user1.getId(), pathContext.getValue("user/id", String.class));
    Assert.assertEquals(user1.getName(), pathContext.getValue("user/name", String.class));
    Assert.assertEquals(Collections.emptyList(), pathContext.getValue("user/roles", List.class));
  }

  @Test
  public void loadAdminUser() {
    String query = String.format("{ user(id: \"%s\") { id username roles } }", adminUser.getId());
    ExecutionResult executionResult = GraphQLHelpers.executeQuery(graphQL, createSecurityContextMap(adminSecurityContext), query);

    JXPathContext pathContext = JXPathContext.newContext(executionResult.getData());
    Assert.assertEquals(adminUser.getId(), pathContext.getValue("user/id", String.class));
    Assert.assertEquals(adminUser.getName(), pathContext.getValue("user/name", String.class));
    Assert.assertEquals(new ArrayList<>(adminUser.getRoles()), pathContext.getValue("user/roles", List.class));
  }

  @Test
  public void loadAdminUserNoAccess() {
    String query = String.format("{ user(id: \"%s\") { id username roles } }", adminUser.getId());
    ExecutionResult executionResult = GraphQLHelpers.executeQuery(graphQL, createSecurityContextMap(securityContext1), query);

    JXPathContext pathContext = JXPathContext.newContext(executionResult.getData());
    Assert.assertEquals(adminUser.getId(), pathContext.getValue("user/id", String.class));
    Assert.assertEquals(adminUser.getName(), pathContext.getValue("user/name", String.class));
    Assert.assertEquals(new ArrayList<>(adminUser.getRoles()), pathContext.getValue("user/roles", List.class));
  }
}