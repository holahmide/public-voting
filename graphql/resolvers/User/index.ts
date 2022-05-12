import { ApolloError, AuthenticationError } from 'apollo-server-express';
import User from '../../../models/User';

export default {
  User: {
    createdAt: (parent: any) => parent.created_at.toString(),
  },
  Query: {
    user: async (_: any, __: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        return User.findById(context.user).populate('roles');
      }
      return new AuthenticationError('you are not logged in');
    },
    userById: async (_: any, args: any, context: GraphqlContext) => {
      const user = await User.findById(args.id).populate('roles');
      if (user) return user;
      return new ApolloError('user not found');
    },
  },
};
