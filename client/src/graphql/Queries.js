import { gql } from "apollo-boost";

export const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($searchTerm: String!) {
    users(searchTerm: $searchTerm) {
      id
      name
      school
      location
      department
    }
  }
`;

export const SEARCH_POSTS = gql`
  query searchPosts($searchTerm: String) {
    users(searchTerm: $searchTerm) {
      id
      name
      school
      location
      department
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
      followers {
        id
      }
      location
      getSpecialties {
        title
        subtitle
      }
    }
  }
`;

export const GET_SPECIALTIES = gql`
  query getSpecialties($userId: ID!) {
    user(userId: $userId) {
      getSpecialties {
        title
        subtitle
      }
    }
  }
`;

export const FOLLOWER_IDS = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      followers {
        id
      }
    }
  }
`;
