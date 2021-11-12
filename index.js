const { ApolloServer, gql } = require("apollo-server");
const { getArtist, saveFavoriteArtist, getUser } = require("./lib/api");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Types
  type Artist {
    id: ID
    name: String
    style: String
  }

  type User {
    id: ID!
    name: String!
    favoriteArtists: [ID!]
  }

  # Actions
  type Query {
    artist(artistName: String!): [Artist]
    user(userId: ID!): User
    users(name: String): [User]
  }

  type Mutation {
    addFavorite(userId: ID!, artistName: String!): User
  }
`;

const resolvers = {
  Query: {
    artist: async (_, args) => {
      const { artistName } = args;
      const data = await getArtist({ artistName });

      if (!data) return null;

      return data;
    },
    user: async (_, args) => {
      const { userId } = args;
      const data = await getUser({ userId });

      if (!data) return null;

      return data;
    },
  },

  Mutation: {
    addFavorite: async (_, args) => {
      const { userId, artistName } = args;

      const userModified = await saveFavoriteArtist({
        userId,
        artistName,
      });
      if (!userModified) return null;

      return userModified;
    },
  },

  Artist: {
    name: (root) => root.strArtist,
    id: (root) => root.idArtist,
    style: (root) => root.strStyle,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
