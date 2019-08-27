package stx.shooterstatistic.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.GraphQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.graphql.Schema;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import java.io.IOException;
import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static graphql.GraphQL.newGraphQL;

@RestController
public class GraphQLController {
  private static final Logger log = LoggerFactory.getLogger(GraphQLController.class);

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private UserService userService;

  @Autowired
  private SecurityService securityService;

  GraphQL graphQL;

  private TypeReference<HashMap<String, Object>> typeRefReadJsonString = new TypeReference<HashMap<String, Object>>() {};

  private Map<String, Object> getVariablesMapFromString(String variablesFromRequest) {
    try {
      return objectMapper.readValue(variablesFromRequest, typeRefReadJsonString);
    } catch (IOException exception) {
      throw new GraphQLException("Cannot parse variables", exception);
    }
  }

  @SuppressWarnings("unchecked")
  private Map<String, Object> getVariablesFromRequest(Map requestBody) {
    Object variablesFromRequest = requestBody.get("variables");

    if (variablesFromRequest == null) {
      return Collections.emptyMap();
    }

    if (variablesFromRequest instanceof String) {
      if (StringUtils.hasText((String) variablesFromRequest)) {
        return getVariablesMapFromString((String) variablesFromRequest);
      }
    } else if (variablesFromRequest instanceof Map) {
      return (Map<String, Object>) variablesFromRequest;
    } else {
      throw new GraphQLException("Incorrect variables");
    }

    return Collections.emptyMap();
  }

  private synchronized GraphQL getGraphQL() {
    if (graphQL == null)
      this.graphQL = newGraphQL(Schema.getShchema()).build();
    return graphQL;
  }

  @PostMapping(value = "/v1/graphql", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity executeOperation(Principal principal, @RequestBody Map body) {
    log.debug("POST /v1/graphql, principal: {}, body: {}", principal, body);

    User user = userService.getUser(principal);
    SecurityContext securityContext = securityService.createContext(user);
    String query = (String) body.get("query");

    Map<String, Object> context = new HashMap<>();
    context.put("securityContext", securityContext);

    Map<String, Object> variables = getVariablesFromRequest(body);

    ExecutionInput executionInput = ExecutionInput.newExecutionInput()
       .query(query)
       .context(context)
       .variables(variables)
       .build();
    ExecutionResult executionResult = getGraphQL().execute(executionInput);

    Map<String, Object> result = new HashMap<>();
    if (!executionResult.getErrors().isEmpty()) {
      result.put("errors", executionResult.getErrors());
      log.error("Errors: {}", executionResult.getErrors());
    }
    result.put("data", executionResult.getData());

    return new ResponseEntity<>(result, executionResult.getErrors().isEmpty() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }
}
