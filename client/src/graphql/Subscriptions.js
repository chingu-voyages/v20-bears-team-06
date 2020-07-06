import { gql } from 'apollo-boost';


export const FOLLOWER_SUB = gql`
    subscription newFollowEvents($userId: ID!) {
        newFollowEvents(userId:$userId){
            followerId
            follower_name
            follower_count

        }
    }
`;

export const NOTIFICATIONS_FROM_FOLLOWING = gql`
    subscription toFollowerSub($userId: ID!) {
        toFollowerSub(userId: $userId){
            id
            created_on
            type
            message
            fromUserName
            fromUserId
            url
        }
    }
`;

export const NOTIFICATIONS = gql`
    subscription notificationSub($userId: ID!) {
        notificationSub(userId: $userId){
            id
            created_on
            type
            message
            fromUserName
            fromUserId
            url
        }
    }
`;



