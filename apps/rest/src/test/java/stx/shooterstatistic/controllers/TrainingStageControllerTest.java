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
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;
import stx.shooterstatistic.model.Stage;
import stx.shooterstatistic.model.Training;
import stx.shooterstatistic.model.TrainingElement;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.TrainingElementService;
import stx.shooterstatistic.tests.TestUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TrainingStageControllerTest {
  private final static Logger log = LoggerFactory.getLogger(TrainingControllerTest.class);
  private final static MediaType contentType_JSON = MediaType.valueOf("application/json;charset=UTF-8");

  @Autowired ObjectMapper objectMapper;
  @Autowired private WebApplicationContext webApplicationContext;
  @Autowired private TestUtils testUtils;
  @Autowired private TrainingElementService trainingElementService;

  private MockMvc mockMvc;
  private User adminUser;
  private UsernamePasswordAuthenticationToken adminPrincipal;

  @Before
  public void init() {
    this.mockMvc = webAppContextSetup(webApplicationContext).build();
    this.adminUser = testUtils.getGlobalAdminUser();
    this.adminPrincipal = new UsernamePasswordAuthenticationToken(adminUser.getUsername(), "fake-password");
  }

  @Test
  public void testGetNonExistingTrainingStage() throws Exception {
    mockMvc.perform(get("/training/{tid}/stage/{sid}", UUID.randomUUID().toString(), UUID.randomUUID().toString()).principal(adminPrincipal))
       .andDo(print())
       .andExpect(status().isNotFound());
  }

  private Stage createStage(Training tr, List<TrainingElement> trainingElements) throws Exception {
    MockHttpServletRequestBuilder requestBuilder = post("/training/{tid}/stage", tr.getId()).principal(adminPrincipal).param("name", "fake stage");
    trainingElements.forEach(te -> requestBuilder.param("elems", te.getId()));

    MvcResult mvcResult = mockMvc.perform(requestBuilder)
       .andExpect(status().isCreated())
       .andReturn();

    Stage stage = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Stage.class);
    Assert.assertNotNull(stage);

    return stage;
  }

  @Test
  public void testCreateDeleteTrainingStage() throws Exception {
    String today = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

    // 1: create training
    MvcResult mvcResult = mockMvc.perform(post("/training").principal(adminPrincipal).param("date", today))
//       .andDo(print())
       .andExpect(status().isCreated())
       .andReturn();

    Training tr = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Training.class);
    Assert.assertNotNull(tr);

    // 2: create training stage
    List<TrainingElement> trainingElements = trainingElementService.all(Pageable.unpaged()).getContent().subList(0, 1);
    Assert.assertNotNull(trainingElements);
    MockHttpServletRequestBuilder requestBuilder = post("/training/{tid}/stage", tr.getId()).principal(adminPrincipal).param("name", "Test stage");
    trainingElements.forEach(te -> requestBuilder.param("elems", te.getId()));

    mvcResult = mockMvc.perform(requestBuilder)
       .andDo(print())
       .andExpect(status().isCreated())
       .andReturn();

    log.info("Response content: {}", mvcResult.getResponse().getContentAsString());

    Stage stage = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Stage.class);
    Assert.assertNotNull(stage);

    // 3: read
    mockMvc.perform(get("/training/{tid}/stage/{sid}", tr.getId(), stage.getId()).principal(adminPrincipal))
       .andExpect(status().isOk())
       .andExpect(content().contentType(contentType_JSON))
       .andExpect(jsonPath("$", is(not(empty()))))
       .andExpect(jsonPath("id", is(not(empty()))))
       .andExpect(jsonPath("id", is(stage.getId())));

    // 4: delete stage
    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());
    mockMvc.perform(get("/training/{tid}/stage/{sid}", tr.getId(), stage.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());

    // 5: delete training
    mockMvc.perform(delete("/training/{tid}", tr.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());
  }

  @Test
  public void testCreateDeleteTrainingStages() throws Exception {
    String today = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

    // 1: create training
    MvcResult mvcResult = mockMvc.perform(post("/training").principal(adminPrincipal).param("date", today))
       .andExpect(status().isCreated())
       .andReturn();

    Training tr = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Training.class);
    Assert.assertNotNull(tr);

    // 2: create training stages
    List<TrainingElement> trainingElements = trainingElementService.all(Pageable.unpaged()).getContent().subList(0, 1);
    Assert.assertNotNull(trainingElements);

    Stage stage1 = createStage(tr, trainingElements);
    Stage stage2 = createStage(tr, trainingElements);
    Stage stage3 = createStage(tr, trainingElements);

    // 3: read

    mockMvc.perform(get("/training/{tid}/stages", tr.getId()).principal(adminPrincipal))
       .andExpect(status().isOk())
       .andExpect(content().contentType(contentType_JSON))
       .andExpect(jsonPath("$", is(not(empty()))))
       .andExpect(jsonPath("$.content", hasSize(equalTo(3))));

    // 4: delete stages

    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage1.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());
    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage2.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());
    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage3.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());

    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage1.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());
    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage2.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());
    mockMvc.perform(delete("/training/{tid}/stage/{sid}", tr.getId(), stage3.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());

    // 5: delete training
    mockMvc.perform(delete("/training/{tid}", tr.getId()).principal(adminPrincipal))
       .andExpect(status().isOk());
    mockMvc.perform(delete("/training/{tid}", tr.getId()).principal(adminPrincipal))
       .andExpect(status().isNotFound());
  }
}
