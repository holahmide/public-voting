import { gql } from 'apollo-server-express';

export default gql`
  type Session {
    id: ID!
    title: String
    slug: String
    description: Int
    logo: String
    isActive: Boolean
    user: User
    categories: [Category]
    startDate: String
    endDate: String
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID!
    name: String
    description: String
    session: Session
  }

  type Nominee {
    id: ID!
    name: String
    regno: Int
    level: Int
    picture: String
    votes: Int
    computedVotes: Int
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
    categories: [Category]
    nomineeById(id: String): Nominee
    nomineesByCategory(category: String): [Nominee]
    voteById(id: String): Vote
    votesByNominee(nominee: String): [Vote]
  }
`;
