import { User } from '../../entity/User';
import { Resolver, Query, FieldResolver, Root } from "type-graphql";
import { FollowerData } from './FollowerDataTypes';

@Resolver(User)
export class FollowerDataResolver{

    @FieldResolver(()=>[FollowerData])
    async followerData(@Root() user:User)
    :Promise<FollowerData[]|undefined> {
        let data = await User.getFollowerData(user.id);
        if (!data) {
            return;
        }

        return data;
    }

    
}