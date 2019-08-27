package stx.shooterstatistic.graphql;

import graphql.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public abstract class GraphQLHelpers {

  private static final Logger log = LoggerFactory.getLogger(GraphQLHelpers.class);

  private GraphQLHelpers() {}

  @NotNull
  public static Map<String, Object> createContext(@NotNull SecurityContext securityContext) {
    Map<String, Object> map = new HashMap<>();
    map.put("securityContext", securityContext);
    return map;
  }

  public static Map<String, Object> createContext(User user) {
    return createContext(SecurityContext.create(user));
  }

  public static Map<String, Object> createUserMap(User user) {
    Map<String, Object> map = new HashMap<>();
    map.put("id", user.getId());
    map.put("username", user.getUsername());
    map.put("name", user.getName());
    map.put("email", user.getEmail());
    return map;
  }

  public static ExecutionResult executeQuery(GraphQL graphQL, Object context, String query) {
    return executeQuery(graphQL, context, query, null);
  }

  public static ExecutionResult executeQuery(GraphQL graphQL, Object context, String query, Map<String, Object> vars) {
    ExecutionInput executionInput = ExecutionInput.newExecutionInput()
       .query(query)
       .context(context)
       .variables(vars)
       .build();

    ExecutionResult executionResult = graphQL.execute(executionInput);
    if (executionResult.getErrors() != null && !executionResult.getErrors().isEmpty()) {
      for (GraphQLError error : executionResult.getErrors()) {
        log.error(error.getMessage());
      }
      throw new GraphQLException("Could not execute query: " + query + "\r\nErrors: " + executionResult.getErrors().toString());
    }
    return executionResult;
  }

  public static <T> T extractMapData(Object data, String... path) {
    Objects.requireNonNull(data);
    Objects.requireNonNull(path);

    if (data instanceof Map) {
      Map<String, Object> mapData = (Map<String, Object>) data;
      String key = path[0];

      Object childData = mapData.get(key);
      if (path.length == 1)
        return (T) childData;

      return GraphQLHelpers.extractMapData(childData, Arrays.copyOfRange(path, 1, path.length));
    } else {
      throw new IllegalArgumentException("Unsupported data object. Data: " + data + ", path" + path);
    }
  }

}
