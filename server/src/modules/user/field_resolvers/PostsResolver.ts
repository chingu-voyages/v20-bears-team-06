import { Resolver, FieldResolver, Root, Query} from 'type-graphql';
import { User } from '../../../entity/User';
import { Post } from '../../../entity/Post';

@Resolver(User)
export class PostsResolver {

    @FieldResolver(() => [Post])
    @Query(() => [Post])
    async getTimeline(@Root() user: User):
    Promise<Post[] | undefined>{
        let posts = await user.posts;
        if (!posts) return undefined;
        if (posts.length<10){
            return posts;
        }

        return posts.slice(0,10);
    }
}

