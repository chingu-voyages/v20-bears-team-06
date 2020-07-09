import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
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
    $filename: String
    $filetype: String
  ){
    editUser(edit:{
      userId: $userId
      school: $school
      department: $department
      position: $position
      about_me: $about_me
      location: $location
      filename: $filename
      filetype: $filetype
    }){
      user{
        id
        school
        department
        position
        about_me
        location
        profilePic_url
      }
      s3{
        signedRequest
        key
      }
      success
    }
  }
  
`;

export const ADD_USER_SPEC = gql`
  mutation addUserSpecialty(
    $title: String!
    $subtitle: String
    $userId: ID
    $postToAdd: ID
  ) {
    addUserSpecialty(
      data: {
        userId: $userId
        title: $title
        subtitle: $subtitle
        postToAdd: $postToAdd
      }
    ) {
      id
      name
      getSpecialties {
        id
        title
        subtitle
      }
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!, $toFollow: ID!) {
    followUser(users: { userId: $userId, toFollow: $toFollow }) {
      id
      name
      followers {
        id
        name
      }
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userId: ID!, $toUnfollow: ID!) {
    unfollowUser(users: { userId: $userId, toUnfollow: $toUnfollow })
  }
`;

export const S3_SIGN_MUTATION = gql`
  mutation SignS3($filename: String!, $filetype: String!, $meId: ID!) {
    signS3(filename: $filename, filetype: $filetype, meId: $meId) {
      key
      signedRequest
    }
  }
`;


export const SET_SEEN_MUTATION = gql `
  mutation setSeen($notificationIds: [ID!]!){
    setSeen(notificationIds: $notificationIds)
  }
`;


export const NEW_UPLOAD_MUTATION = gql`
  mutation newFileUpload($meId: ID!, $filetype: String!, $filename: String!){
    newFileUpload(meId: $meId filetype:$filetype filename:$filename){
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

export const GET_SIGNED_DOWNLOAD = gql`
    mutation s3download($fileId: ID!){
        s3download(fileId: $fileId){
          signedRequest
          key
        }      
    }
`;