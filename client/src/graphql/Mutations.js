import { gql } from "apollo-boost";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const EDIT_PROFILE_MUTATION = gql`
  mutation editUser(
    $userId: ID! 
    $school: String
    $department: String
    $position: String
    $about_me: String
    $location: String 
  ) {
    editUser(edit:{
      userId: $userId
      school: $school
      department: $department
      position: $position
      about_me: $about_me
      location: $location
    }){
      id
      school
      department
      position
      about_me
      location
    }
  } 
`;

export const ADD_USER_SPEC = gql`
  mutation addUserSpecialty(
    $title: String!
    $subtitle: String
    $userId: ID
    $postToAdd: ID
  ){
    addUserSpecialty(data:{
      userId: $userId
      title: $title
      subtitle: $subtitle
      postToAdd : $postToAdd
    }){
      id
      name
      getSpecialties{
        id
        title
        subtitle
      }
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser(
    $userId: ID!
    $toFollow: ID!
  ){
    followUser(users:{
      userId: $userId,
      toFollow: $toFollow
    }){
      id
      name
      followers{
        id
        name
      }
    }
  }

`;


export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser(
    $userId: ID!,
    $toUnfollow: ID!){
      unfollowUser(users:{
        userId: $userId,
        toUnfollow: $toUnfollow
      })      
    }
`;


