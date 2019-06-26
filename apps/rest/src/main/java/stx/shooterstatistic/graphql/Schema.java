package stx.shooterstatistic.graphql;

import graphql.schema.*;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

import java.io.InputStreamReader;

public class Schema {

  private static RuntimeWiring buildRuntimeWiring() {
    return RuntimeWiring.newRuntimeWiring()
       .type("Query", builder -> builder
          .dataFetcher("organization", QueryFetchers.organizationFetcher)
          .dataFetcher("user", QueryFetchers.userFetcher)
          /*.dataFetcher("workspaceUsers", QueryFetchers.workspaceUsersFetcher)
          .dataFetcher("statistic", QueryFetchers.timeStatisticFetcher)
          .dataFetcher("timeEntries", QueryFetchers.searchTimeEntriesFetcher)*/
       )
       /*.type("Workspace", QueryFetchers::workspaceFetcherBuilder)
       .type("WorkspaceUser", QueryFetchers::workspaceUserFetcherBuilder)
       .type("Client", QueryFetchers::clientFetcherBuilder)
       .type("Product", QueryFetchers::productFetcherBuilder)
       .type("Project", QueryFetchers::projectFetcherBuilder)*/
       .build();
  }

  private static GraphQLSchema loadSchema() {
    SchemaParser schemaParser = new SchemaParser();
    TypeDefinitionRegistry typeDefinitionRegistry = schemaParser.parse(new InputStreamReader(Schema.class.getResourceAsStream("/schema.graphqls")));

    SchemaGenerator schemaGenerator = new SchemaGenerator();
    return schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, buildRuntimeWiring());
  }

  private static GraphQLSchema schema_resource;

  public synchronized static GraphQLSchema getShchema() {
    if (schema_resource == null)
      schema_resource = loadSchema();
    return schema_resource;
  }
}
