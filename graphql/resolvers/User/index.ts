import { ApolloError, AuthenticationError } from 'apollo-server-express';
import User from '../../../models/User';

export default {
  User: {
    createdAt: (parent: any) => parent.created_at.toString(),
  },
  Token: {
    expires: (parent: any) => parent.expires.toString(),
    createdAt: (parent: any) => parent.created_at.toString(),
  },
  Query: {
    user: async (_: any, __: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        return User.findById(context.user).populate('roles');
      }
      return new AuthenticationError('you are not logged in');
    },
    users: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isSuperUser) {
        return {
          data: User.find({}),
        };
      }
      return new AuthenticationError('you are not a super user');
    },
    userById: async (_: any, args: any, context: GraphqlContext) => {
      const user = await User.findById(args.id).populate('roles');
      if (user) return user;
      return new ApolloError('user not found');
    },
  },
};
