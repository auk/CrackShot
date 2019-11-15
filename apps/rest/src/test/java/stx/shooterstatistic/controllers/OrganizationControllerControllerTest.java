package stx.shooterstatistic.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.context.WebApplicationContext;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.UserService;
import stx.shooterstatistic.tests.TestUtils;

import java.util.UUID;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class OrganizationControllerControllerTest {

  private static final Logger log = LoggerFactory.getLogger(OrganizationControllerControllerTest.class);
  private static final MediaType contentType_JSON = MediaType.valueOf("application/json;charset=UTF-8");

  @Autowired private ObjectMapper objectMapper;
  @Autowired private WebApplicationContext webApplicationContext;
  @Autowired private TestUtils testUtils;
  @Autowired private UserService userService;

  private User adminUser;
  private UsernamePasswordAuthenticationToken adminPrincipal;
  private MockMvc mockMvc;

  @Before
  public void init() {
    this.mockMvc = webAppContextSetup(webApplicationContext).build();
    this.adminUser = testUtils.getGlobalAdminUser();
    this.adminPrincipal = new UsernamePasswordAuthenticationToken(adminUser.getUsername(), "fake-password");
  }

  @Test
  public void testGetNonExistingOrganization() throws Exception {
    mockMvc.perform(
      get("/organization/{oid}", UUID.randomUUID().toString())
      .principal(adminPrincipal))
      .andExpect(status().isNotFound());
  }

  @Test
  public void testOrganization() throws Exception {
    String name = "Organization " + UUID.randomUUID().toString();
    String phone = "+1-(111)-222-333-444";

    MvcResult mvcResult = mockMvc.perform(
       post("/organization")
          .principal(adminPrincipal)
          .param("name", name)
          .param("phone", phone))
       .andExpect(status().isCreated())
       .andExpect(content().contentType(contentType_JSON))
       .andExpect(jsonPath("$", is(not(empty()))))
       .andExpect(jsonPath("id", is(not(empty()))))
       .andExpect(jsonPath("name", is(name)))
       .andExpect(jsonPath("phone", is(phone)))
       .andReturn();

    Organization org = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Organization.class);
    Assert.assertNotNull(org);

    mockMvc.perform(get("/organization/{oid}", org.getId()).principal(adminPrincipal))
       .andExpect(status().isOk())
       .andExpect(content().contentType(contentType_JSON))
       .andExpect(jsonPath("$", is(not(empty()))))
       .andExpect(jsonPath("id", is(not(empty()))))
       .andExpect(jsonPath("name", is(name)))
       .andExpect(jsonPath("phone", is(phone)));

    mockMvc.perform(delete("/organization/{oid}", org.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());

    mockMvc.perform(get("/organization/{oid}", org.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());
  }
}