const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Types
  type User {
    id: ID!
    name: String!
    favoriteArtistsIds: [ID!]!
  }

  ## Artist type

  ## User type

  # Operations

  ## Queries
  type Query {
    users: [User!]
  }

  ## Mutations
`;

const resolvers = {};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
