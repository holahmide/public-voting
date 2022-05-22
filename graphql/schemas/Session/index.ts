import { gql } from 'apollo-server-express';

export default gql`
  type Session {
    id: ID!
    title: String
    slug: String
    description: String
    logo: String
    isActive: Boolean
    user: User
    categories: [Category]
    nominees: [Nominee]
    startDate: String
    endDate: String
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID!
    slug: String
    name: String
    description: String
    session: Session
    nominees: [Nominee]
    isVoted: Boolean
    votedFor: Nominee
  }

  type Nominee {
    id: ID!
    name: String
    regno: Int
    department: String
    picture: String
    isVoted: Boolean
    votes: Int
    category: Category
    createdAt: String
    updatedAt: String
  }

  type Vote {
    id: ID!
    category: Category
    nominee: Nominee
    user: User
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    sessionById(id: String): Session
    sessionBySlug(slug: String): Session
    sessions: [Session]
    categoryById(id: String): Category
    categoryBySlug(slug: String): Category
    categories: [Category]
    nomineeById(id: String): Nominee
    nomineesByCategory(category: String): [Nominee]
    voteById(id: String): Vote
    votesByNominee(nominee: String): [Vote]
  }
`;
