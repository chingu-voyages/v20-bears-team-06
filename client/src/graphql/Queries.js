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
    id
    name
    school
    department
    position
    employment
    follower_count
    about_me
    location
    getSpecialties{
      title
      subtitle
    }
  }
}
`;

export const GET_SPECIALTIES = gql`
query getSpecialties($userId: ID!) {
  user(userId: $userId){
    getSpecialties{
      title
      subtitle
    }

  }
}
`;


