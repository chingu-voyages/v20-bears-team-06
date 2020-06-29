import {Field, ID, Resolver, ArgsType, FieldResolver, ResolverFilterData, Mutation, Arg, Query, Root, PubSub, Publisher, Subscription, Args,  } from 'type-graphql';
import { FollowInput } from './FollowInput';
import { User } from '../../../entity/User';
import { Topic } from '../../../types/Topic';
import { FollowEventPayload } from '../../../types/Payloads';
import { FollowEvent } from '../../../types/FollowEvent';


@ArgsType()
class FollowEventArgs{
    @Field(() => ID)
    userId: number;
    
}

@Resolver(User)
export class FollowResolver{
    @Mutation(() => [User])
    async followUser(
        @Arg('users') {userId, toFollow} : FollowInput,
        @PubSub(Topic.FollowEvent) followEvent : Publisher<FollowEventPayload>
    ):Promise<User[] | undefined>{
        let one = await User.findOne(userId);
        let two = await User.findOne(toFollow);
        if (!one || !two){
            return;
        }

        let following = await one.following;
        let followers = await two.following;

        followers = followers.filter(el=>el.id===userId);
        following = following.filter(el=>el.id===toFollow);

        if (followers.length===0){
            (await two.followers).push(one);
        }

        if(following.length===0){
            (await one.following).push(two);
        }

        one = await one.save();
        if (one){
            one = await User.findOne(userId)
        }
        two = await two.save();
        if (two){
            two = await User.findOne(toFollow);
        }

        if (!one || !two){
            return;
        }

        await followEvent({
            toFollowId: toFollow,
            dateString: Date.now().toString(),
            followerId: userId,
            follower_name: one.name(one),
            event_type: 'follow',
            follower_count: two.follower_count,
            following_count: one.following_count
        })

        return [one,two];

   
        
    }

    @Subscription(() => FollowEvent, {
        topics: Topic.FollowEvent,
        filter: ( { payload, args }: ResolverFilterData<FollowEventPayload , FollowEventArgs>) => {
           return payload.followerId === args.userId || payload.toFollowId === args.userId;
        }
    })
    newFollowEvents(
        @Root() newFollowEvent: FollowEventPayload,
        @Args() { userId } : FollowEventArgs
    ) : FollowEvent {
        console.log(userId);
        return {
            toFollowId: newFollowEvent.toFollowId,
            followerId: newFollowEvent.followerId,
            date:  new Date(Date.now()) ,
            follower_count: newFollowEvent.follower_count,
            following_count: newFollowEvent.following_count,
            follower_name: newFollowEvent.follower_name



        }

    }

    @FieldResolver(() => [User])
    @Query(() => [User])
    async following(
        @Root() user : User
    ): Promise<User[] | undefined> {
        let follow_list = await user.following;
        return follow_list || undefined;

    }

    @Mutation(() => Boolean)
    async unfollowUser(
        @Arg('users') {userId, toUnfollow} : FollowInput,
        @PubSub(Topic.FollowEvent) followEvent: Publisher<FollowEventPayload>  
    ) : Promise<Boolean>{
        

        let user = await User.findOne(toUnfollow);
        let followers = await user?.followers;
        if (followers){
            followers = followers.filter(el=>el.id!==Number(userId));
            console.log(followers);
            if (user){
                user.followers = followers;
                await user.save();

                if (user){
                    let updatedUser = await User.findOne(toUnfollow);
                    let unfollower = await User.findOne(userId);
                    if (unfollower&&updatedUser){
                        await followEvent({
                            toFollowId: toUnfollow,
                            dateString: Date.now().toString(),
                            followerId: userId,
                            follower_name: unfollower.name(unfollower),
                            event_type: 'unfollow',
                            follower_count: updatedUser.follower_count,
                            following_count: unfollower.following_count

                        })

                        return true;
                    }   
                }
            }
        }
       

        return false;

    }

}

