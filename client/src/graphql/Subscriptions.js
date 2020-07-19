import { gql } from 'apollo-boost';

export const FOLLOWER_SUB = gql`
  subscription newFollowEvents($userId: ID!) {
    newFollowEvents(userId: $userId) {
      followerId
      follower_name
      follower_count
    }
  }
`;

export const NOTIFICATIONS = gql`
  subscription notificationsSub($userId: ID!) {
    notificationsSub(userId: $userId) {
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
