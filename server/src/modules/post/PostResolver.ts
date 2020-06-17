import { Resolver, Query, ArgsType, Arg, ID, Field, Args, Mutation } from 'type-graphql';
import { PostInput } from './PostInput';
import { Post } from '../../entity/Post';

@ArgsType()
class GetPostArgs{
    @Field(()=>ID)
    postId: string;
};




@Resolver()
export class PostResolver{
    @Query(() => Post, {nullable:true})
    async getPost(
        @Args() {postId} : GetPostArgs
    ):Promise<Post | undefined>{
        return Post.findOne(postId) || undefined;
    }

    @Mutation(() => Post)
    
    async newPost(@Arg("content")
    { text , userId } : PostInput ):Promise<Post>{

        const post = await Post.create({
            text,
            userId
        }).save();

        if (!post){
            throw new Error('new post failed')
        }

        return post;


        
    }
    

}