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


