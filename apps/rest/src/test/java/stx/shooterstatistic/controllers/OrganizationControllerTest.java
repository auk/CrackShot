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
public class OrganizationControllerTest {

  private final static Logger log = LoggerFactory.getLogger(OrganizationControllerTest.class);

//  private MediaType contentType_HAL_JSON = MediaType.valueOf("application/hal+json;charset=UTF-8");
  private MediaType contentType_JSON = MediaType.valueOf("application/json;charset=UTF-8");

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  private WebApplicationContext webApplicationContext;

  @Autowired
  UserService userService;

  private final static String adminUsername = "admin-" + UUID.randomUUID().toString();
  private final static String adminEmail = adminUsername + "@email";
  private final static UsernamePasswordAuthenticationToken adminPrincipal = new UsernamePasswordAuthenticationToken(adminUsername, adminUsername);

  private User adminUser;

  private MockMvc mockMvc;

  @Before
  public void init() {
    this.mockMvc = webAppContextSetup(webApplicationContext).build();
    this.adminUser = userService.findUserByEmail(adminEmail).orElseGet(() -> userService.saveUser(adminUsername, adminEmail));
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
