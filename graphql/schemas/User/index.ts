import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    regno: Int
    email: String
    isConfirmed: Boolean
    createdAt: String
    updatedAt: String
  }
  
  extend type Query {
    user: User
    userById(id: String!): User
  }
`;
