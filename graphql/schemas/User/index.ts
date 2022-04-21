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
  
  extend type Query {
    user: User
    users(skip: Int, limit: Int, keyword: String): UserSearch
    userById(id: String!): User
  }
`;
