import { gql } from "apollo-boost";

export const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`;

export const GET_PROFILE = gql`
query getUser($userId: ID!) {
  user(userId: $userId) {
    name
    school
    department
    position
    employment
    getTimeline{
      id
      likes
      shares
      text
      date
    }
  }
}
`;
