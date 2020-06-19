import { gql } from "apollo-boost";

export const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`;
