import { gql } from 'apollo-server-express';
import userSchema from './User';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;
export default [linkSchema, userSchema];
