const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Creation {
  _id: ID
  creationText: String
  creationURL: String
  creationAuthor: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    creations: [Creation]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    creations(username: String): [Creation]
    creation(creationId: ID!): Creation
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCreation(creationText: String!): Creation
    addCreationURL(creationURL: String!): Creation
    removeCreation(creationId: ID!): Creation
  }
`;

module.exports = typeDefs;
