import { Resolver, FieldResolver, Mutation, Arg, Query, Root} from 'type-graphql';
import { FollowInput } from './FollowInput';
import { User } from '../../../entity/User';

@Resolver(User)
export class FollowResolver{
    @Mutation(() => [User])
    async followUser(
        @Arg('users') {userId, toFollow} : FollowInput
    ):Promise<User[] | undefined>{
        let one = await User.findOne(userId);
        let two = await User.findOne(toFollow);
        if (!one || !two){
            return;
        }

        let following = await one.following;
        let followers = await two.following;

        followers = followers.filter(el=>el.id===Number(userId));
        following = following.filter(el=>el.id===Number(toFollow));

        if (followers.length===0){
            (await two.followers).push(one);
        }

        if(following.length===0){
            (await one.following).push(two);
        }

        one = await one.save();
        two = await two.save();

        if (!one || !two){
            return;
        }

        return [one,two];

   
        
    }

    @FieldResolver(() => [User])
    @Query(() => [User])
    async following(
        @Root() user : User
    ): Promise<User[] | undefined> {
        let follow_list = await user.following;
        return follow_list || undefined;

    }

}

