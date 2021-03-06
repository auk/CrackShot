package stx.shooterstatistic.graphql;

import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Component
public class QueryFetchers {

  private static OrganizationService organizationService;
  private static SecurityService securityService;
  private static UserService userService;

  @Autowired
  public QueryFetchers(OrganizationService organizationService, SecurityService securityService, UserService userService) {
    QueryFetchers.organizationService = Objects.requireNonNull(organizationService);
    QueryFetchers.securityService = Objects.requireNonNull(securityService);
    QueryFetchers.userService = Objects.requireNonNull(userService);
  }

  private static Map getGraphQLContext(Object context) {
    if (context instanceof Map)
      return ((Map) context);
    throw new IllegalArgumentException("GraphQL context must be instance of Map");
  }

  private static Optional<Organization> findParentOrganization(SecurityContext securityContext, Object source) {
//    if (source instanceof IBelongsWorkspace) {
//      String id = ((IBelongsWorkspace) source).getWorkspace().getId();
//      return Optional.of(workspaceService.getWorkspace(securityContext, id));
//    }

    if (source instanceof Organization)
      return Optional.of((Organization) source);

    return Optional.empty();
  }

  public static DataFetcher<Organization> organizationFetcher = env -> {
    SecurityContext securityContext = (SecurityContext) getGraphQLContext(env.getContext()).get("securityContext");
    Objects.requireNonNull(securityContext);

    Optional<Organization> opWorkspace = findParentOrganization(securityContext, env.getSource());
    if (opWorkspace.isPresent())
      return opWorkspace.get();

    String id = env.getArgument("id");
    return organizationService.getOrganization(securityContext, id);
  };

  public static DataFetcher<User> userFetcher = env -> {
    SecurityContext securityContext = (SecurityContext) getGraphQLContext(env.getContext()).get("securityContext");
    Objects.requireNonNull(securityContext);

    String id = env.getArgument("id");
    if (id == null || id.isEmpty())
      return securityContext.getUser();

    return userService.getUserById(securityContext, id);
  };
}