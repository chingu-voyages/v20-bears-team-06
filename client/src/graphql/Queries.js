import { gql } from "apollo-boost";

export const GET_ME = gql`
  {
    me {
      id
      name
      firstName
    }
  }
`;

export const GET_ME_CACHE = gql`
  query GetMe {
    me @client {
      id
      name
      firstName
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
      avatarUrl
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
      profilePic_url
    }
  }
`;

export const SEARCH_POSTS = gql`
  query searchPosts($searchTerm: String!) {
    posts(searchTerm: $searchTerm) {
      id
      text
      userId
    }
  }
`;

export const SEARCH_FILES = gql`
  query searchFiles($searchTerm: String!) {
    searchFiles(searchTerm: $searchTerm) {
      id
      ownerId
      filename
      filetype
      key
    }
  }
`;

export const GET_PROFILE = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      firstName
      lastName
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
      followers {
        id
        profilePic_url
        department
        firstName
        lastName
        school
        employment
        location
        name
      }
      uploads {
        id
        filetype
        filename
        date
        ownerId
        signedRequest
        download_count
        likes
        key
        gradeLevel
        favorite_count
        save_count
        favoritedByIds
        savedByIds
      }
      savedContent {
        id
        filetype
        filename
        date
        ownerId
        signedRequest
        download_count
        likes
        key
        gradeLevel
        favorite_count
        save_count
        favoritedByIds
        savedByIds
      }
      favoriteContent {
        id
        filetype
        filename
        date
        ownerId
        signedRequest
        download_count
        likes
        key
        gradeLevel
        favorite_count
        save_count
        favoritedByIds
        savedByIds
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
  query files($userId: ID!) {
    files(userId: $userId) {
      id
      filetype
      filename
      date
      ownerId
      signedRequest
      download_count
      likes
      key
      gradeLevel
      favorite_count
      save_count
    }
  }
`;

export const GET_ALL_FILES = gql`
  query getAllFiles($userId: ID!) {
    getAllFiles(userId: $userId) {
      uploads {
        id
        filetype
        filename
        date
        ownerId
        signedRequest
        download_count
        likes
        key
        gradeLevel
        favorite_count
        save_count
      }
      savedContent {
        id
        filetype
        filename
        date
        ownerId
        signedRequest
        download_count
        likes
        key
        gradeLevel
        favorite_count
        save_count
      }
      favoriteContent {
        id
        filetype
        filename
        date
        ownerId
        signedRequest
        download_count
        likes
        key
        gradeLevel
        favorite_count
        save_count
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query following($userId: ID!, $meId: ID!) {
    following(userId: $userId, meId: $meId) {
      isFollowing
      isOwnProfile
    }
  }
`;

export const GET_SAVED_FILES = gql`
  query getSavedFiles($userId: ID!) {
    getSavedFiles(userId: $userId) {
      id
      filetype
      filename
      date
      ownerId
      signedRequest
      download_count
      likes
      key
      gradeLevel
      favorite_count
      save_count
    }
  }
`;

export const GET_FAVORITE_FILES = gql`
  query getFavoriteFiles($userId: ID!) {
    getFavoriteFiles(userId: $userId) {
      id
      filetype
      filename
      date
      ownerId
      signedRequest
      download_count
      likes
      key
      gradeLevel
      favorite_count
      save_count
    }
  }
`;
