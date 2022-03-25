import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import User from '../models/User';
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
  context: async ({req}) => {
    const { access_token } = req.cookies;
    const user_id = getUser(access_token);
    const user = await User.findById(user_id).populate('roles');
    const userRoles = user_id !== null ? user.roles : [];
    return {
        user: user_id,
        isLoggedIn: user_id !== null,
        isAdmin: userRoles.map((el: any) => el.name).includes('ADMIN'),
        isSuperUser: userRoles.map((el: any) => el.name).includes('SUPER_USER'),
      };
  },
});

export default graphqlServer;