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
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.UserService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TrainingControllerTest {
  private final static Logger log = LoggerFactory.getLogger(TrainingControllerTest.class);
  private final static MediaType contentType_JSON = MediaType.valueOf("application/json;charset=UTF-8");

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  private WebApplicationContext webApplicationContext;

  private MockMvc mockMvc;

  @Autowired
  UserService userService;
  private User adminUser;

  private final static String adminUsername = "admin-" + UUID.randomUUID().toString();
  private final static String adminEmail = adminUsername + "@email";
  private final static UsernamePasswordAuthenticationToken adminPrincipal = new UsernamePasswordAuthenticationToken(adminUsername, adminUsername);

  @Before
  public void init() {
    this.mockMvc = webAppContextSetup(webApplicationContext).build();
    this.adminUser = userService.findUserByEmail(adminEmail).orElseGet(() -> userService.createUser(adminUsername, adminEmail));
  }

  @Test
  public void testGetNonExistingTraining() throws Exception {
    mockMvc.perform(get("/training/{tid}", UUID.randomUUID().toString()).principal(adminPrincipal))
//       .andDo(print())
       .andExpect(status().isNotFound());
  }

  @Test
  public void testCreateDeleteTraining() throws Exception {
    String today = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

    // 1: create
    MvcResult mvcResult = mockMvc.perform(post("/training").principal(adminPrincipal)
       .param("date", today)
      )
       .andDo(print())
       .andExpect(status().isCreated())
       .andReturn();

    Training tr = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Training.class);
    Assert.assertNotNull(tr);

    // 2: read
    mockMvc.perform(get("/training/{tid}", tr.getId()).principal(adminPrincipal))
       .andDo(print())
       .andExpect(content().contentType(contentType_JSON))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$", is(not(empty()))))
       .andExpect(jsonPath("id", is(not(empty()))))
       .andExpect(jsonPath("id", is(tr.getId())))
       .andExpect(jsonPath("date", is(today)));

    mockMvc.perform(delete("/training/{tid}", tr.getId()).principal(adminPrincipal))
       .andDo(print())
       .andExpect(status().isOk());

    mockMvc.perform(get("/training/{tid}", tr.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());
  }
}
