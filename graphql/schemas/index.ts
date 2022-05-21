import { gql } from 'apollo-server-express';
import userSchema from './User';
import adminSchema from './User/admin';
import sessionSchema from './Session';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;
export default [linkSchema, userSchema, adminSchema, sessionSchema];
