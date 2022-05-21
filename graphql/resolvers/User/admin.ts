import { ApolloError, AuthenticationError } from 'apollo-server-express';
import Admin from '../../../models/User/admin';

export default {
  Admin: {
    createdAt: (parent: any) => parent.created_at.toString(),
  },
  Query: {
    admin: async (_: any, __: any, context: GraphqlContext) => {
      if (context.isLoggedIn && context.isAdmin) {
        return Admin.findById(context.user);
      }
      return new AuthenticationError('you are not logged in');
    },
    adminById: async (_: any, args: any, context: GraphqlContext) => {
      const user = await Admin.findById(args.id);
      if (user) return user;
      return new ApolloError('user not found');
    },
  },
};
