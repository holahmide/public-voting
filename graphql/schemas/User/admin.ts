import { gql } from 'apollo-server-express';

export default gql`
  type Admin {
    id: ID!
    firstName: String
    lastName: String
    email: String
    isConfirmed: Boolean
    createdAt: String
    updatedAt: String
  }
  
  extend type Query {
    admin: Admin
    adminById(id: String!): Admin
  }
`;
