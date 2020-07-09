import { gql } from "apollo-boost";

export const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`;

export const NOTIFICATION_QUERY = gql`
  query newNotifications($userId: ID!) {
    newNotifications(userId: $userId) {
      type
      message
      fromUserName
      fromUserId
      id
      url
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
      position
    }
  }
`;

export const SEARCH_POSTS = gql`
  query searchPosts($searchTerm: String) {
    posts(searchTerm: $searchTerm) {
      id
      text
      author
    }
  }
`;

export const SEARCH_FILES = gql`
  query searchFiles($searchTerm: String) {
    searchFiles(searchTerm: $searchTerm) {
      id
      userId
      filename
      filetype
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
      profilePic_url
      about_me
      followers {
        id
      }
      location
      getSpecialties {
        title
        subtitle
      }
      followers{
        id
        profilePic_url
        department
        firstName
        lastName
        school
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

export const GET_FILES = gql`
  query files($userId: ID!){
    files(userId: $userId){
      id
      filetype
      filename
      date
      ownerId
      signedRequest
      download_count
      likes
      key
    }
  }

`;






