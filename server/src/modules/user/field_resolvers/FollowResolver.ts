import { Resolver, FieldResolver, Mutation, Arg, Root, Query} from 'type-graphql';
import { User } from '../../../entity/User';

@Resolver(User)
export class FollowResolver{

    @FieldResolver(() => [User])
    @Mutation(() => [User])
    async follow(
        @Arg('to_follow') to_follow: string,
        @Root() user : User
    ): Promise<User[] | undefined> {

        let userOne = await User.findOne(to_follow);
        if (userOne){
            (await userOne.followers).push(user);
            (await user.following).push(userOne);

            let result = await Promise.all(
                [userOne.save(),
                user.save()]
            );

            if(!result){
                return undefined;
            }

            return result;
            
        }

        return undefined;

        
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

