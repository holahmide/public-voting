import { ApolloError, AuthenticationError } from 'apollo-server-express';
import Session from '../../../models/Session';
import Category from '../../../models/Session/Category';
import Nominee from '../../../models/Session/Nominee';
import Vote from '../../../models/Session/Vote';

export default {
  Session: {
    startDate: (parent: any) => parent.startDate.toString(),
    endDate: (parent: any) => parent.endDate.toString(),
    updatedAt: (parent: any) => parent.updated_at.toString(),
    createdAt: (parent: any) => parent.created_at.toString(),
    categories: async (parent: any) =>
      await Category.find({ session: parent.id }),
  },
  Nominee: {
    updatedAt: (parent: any) => parent.updated_at.toString(),
    createdAt: (parent: any) => parent.created_at.toString(),
  },
  Vote: {
    updatedAt: (parent: any) => parent.updated_at.toString(),
    createdAt: (parent: any) => parent.created_at.toString(),
  },
  Query: {
    sessions: async (_: any, __: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        return await Session.find({ user: context.user }).populate('user');
      }
      return new AuthenticationError('you are not logged in');
    },
    sessionById: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        const session = await Session.findById(args.id).populate('user');
        if (session) return session;
        return new ApolloError('session not found');
      }
      return new ApolloError('you are not logged in');
    },
    sessionBySlug: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        const session = await Session.findById(args.slug).populate('user');
        if (session) return session;
        return new ApolloError('session not found');
      }
      return new ApolloError('you are not logged in');
    },
    nomineesByCategory: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        return await Nominee.find({ category: args.category }).populate(
          'category'
        );
      }
      return new ApolloError('you are not logged in');
    },
    nomineeById: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        const nominee = await Nominee.findById(args.id).populate('category');
        if (nominee) return nominee;
        return new ApolloError('nominee not found');
      }
      return new ApolloError('you are not logged in');
    },
    votesByNominee: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        return await Vote.find({ category: args.nominee }).populate(
          'nominee'
        );
      }
      return new ApolloError('you are not logged in');
    },
    voteById: async (_: any, args: any, context: GraphqlContext) => {
      if (context.isLoggedIn) {
        const vote = await Vote.findById(args.id).populate('category');
        if (vote) return vote;
        return new ApolloError('vote not found');
      }
      return new ApolloError('you are not logged in');
    },
  },
};
