import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import User from '../models/User';
import Admin from '../models/User/admin';
import schemas from './schemas';
import resolvers from './resolvers';

// get User
const getUser = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    return decoded.id;
  } catch {
    return null;
  }
};

const graphqlServer = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    const { access_token } = req.cookies; // Normal User
    const { special_access_token } = req.cookies; // Admin User
    let user_id = null;
    let user: any = {};
    let isAdmin = false;
    if (access_token) { // User
      user_id = getUser(access_token);
      user = await User.findById(user_id);
    }
    else if (special_access_token) { // Admin
      user_id = getUser(special_access_token);
      user = await Admin.findById(user_id);
      isAdmin = true
    }

    return {
      user: user_id,
      isLoggedIn: user_id !== null,
      isAdmin,
    };
  },
});

export default graphqlServer;