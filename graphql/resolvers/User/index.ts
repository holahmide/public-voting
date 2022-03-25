import { ApolloError, AuthenticationError } from 'apollo-server-express';
import Token from '../../../models/Token';
import User from '../../../models/User';
import Role from '../../../models/User/role';

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
            data: User.find({})
        }
      }
      return new AuthenticationError('you are not a super user');
    },
    userById: async (_: any, args: any, context: GraphqlContext) => {
    //   if (context.isSuperUser) {
        const user = await User.findById(args.id).populate('roles');
        if (user) return user;
        return new ApolloError('user not found');
    //   }
    //   return new AuthenticationError('you are not a super user');
    },
    tokens: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isSuperUser) {
        const tokens = await Token.find({ });
        return {
          tokens
        };
      }
      return new AuthenticationError('you are not a super user');
    },
    tokenById: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isSuperUser) {
        const token = await Token.findById(args.id).populate('user');
        if (token) return token;
        return new ApolloError('token not found');
      }
      return new AuthenticationError('you are not a super user');
    },
    roles: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isSuperUser) {
        return Role.find({});
      }
      return new AuthenticationError('you are not a super user');
    },
  },
};
