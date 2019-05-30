package stx.shooterstatistic.graphql;

import graphql.schema.DataFetcher;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.services.OrganizationService;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

public class QueryFetchers {

  private static OrganizationService organizationService;

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

}
