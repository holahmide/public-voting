import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    regNo: Int
    email: String
    isConfirmed: Boolean
    roles: [Role]
    createdAt: String
    updatedAt: String
  }
  type UserSearch {
    count: Int
    data: [User]
  }
  type Role {
    id: ID!
    name: String
    created_at: String
  }
  type Token {
    id: ID!
    token: String
    expires: String
    type: String
    user: User
    store: String
    createdAt: String
  }
  type TokenSearch {
    count: Int
    data: [Token]
  }
  extend type Query {
    user: User
    users(skip: Int, limit: Int, keyword: String): UserSearch
    userById(id: String!): User
    roles: [Role]
    tokens(skip: Int, limit: Int, keyword: String): TokenSearch
    tokenById(id: String!): Token
  }
`;
