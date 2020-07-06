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



export const NOTIFICATIONS = gql`
    subscription notificationsSub($userId: ID!) {
        notificationsSub(userId: $userId){
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



