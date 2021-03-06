import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      id
      firstName
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
    $firstName: String
    $lastName: String
  ) {
    editUser(
      edit: {
        userId: $userId
        school: $school
        department: $department
        position: $position
        about_me: $about_me
        location: $location
        filename: $filename
        filetype: $filetype
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        id
        school
        department
        position
        about_me
        location
        profilePic_url
        firstName
        lastName
        name
      }
      s3 {
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
      }
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userId: ID!, $toUnfollow: ID!) {
    unfollowUser(users: { userId: $userId, toUnfollow: $toUnfollow }) {
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
      followers {
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

export const S3_SIGN_MUTATION = gql`
  mutation SignS3($filename: String!, $filetype: String!, $meId: ID!) {
    signS3(filename: $filename, filetype: $filetype, meId: $meId) {
      key
      signedRequest
    }
  }
`;

export const SET_SEEN_MUTATION = gql`
  mutation setSeen($notificationIds: [ID!]!) {
    setSeen(notificationIds: $notificationIds)
  }
`;

export const NEW_UPLOAD_MUTATION = gql`
  mutation newFileUpload($meId: ID!, $filetype: String!, $filename: String!) {
    newFileUpload(meId: $meId, filetype: $filetype, filename: $filename) {
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
  mutation s3download($fileId: ID!) {
    s3download(fileId: $fileId) {
      signedRequest
      key
    }
  }
`;

export const INCREMENT_DOWNLOAD_MUTATION = gql`
  mutation incrementDownloadCount($fileId: ID!) {
    incrementDownloadCount(fileId: $fileId) {
      id
      download_count
      filetype
      filename
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

export const FILE_ACTION_MUTATION = gql`
  mutation fileAction($fileId: ID!, $userId: ID!, $actionType: String!) {
    fileAction(userId: $userId, fileId: $fileId, actionType: $actionType) {
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

export const REMOVE_FOLLOWER_MUTATION = gql`
  mutation removeFollower($meId: ID!, $userId: ID!) {
    removeFollower(meId: $meId, userId: $userId) {
      id
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
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($fileId: ID!) {
    deleteFile(fileId: $fileId) {
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
      }
    }
  }
`;

export const REMOVE_SAVED_FILE = gql`
  mutation removeSaved($meId: ID!, $fileId: ID!) {
    removeSaved(meId: $meId, fileId: $fileId) {
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
      }
    }
  }
`;

export const REMOVE_FAV_FILE = gql`
  mutation removeFavorite($meId: ID!, $fileId: ID!) {
    removeFavorite(meId: $meId, fileId: $fileId) {
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
      }
    }
  }
`;

export const EDIT_FILE_DETAILS = gql`
  mutation editFileDetails(
    $fileId: ID!
    $filename: String = null
    $description: String = ""
    $gradeLevel: String = ""
    $category: String = ""
  ) {
    editFileDetails(
      fileId: $fileId,
      filename: $filename,
      description: $description,
      gradeLevel: $gradeLevel,
      category: $category
    ){
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
