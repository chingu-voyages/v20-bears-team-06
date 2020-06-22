import { Resolver, Arg, Mutation, Query, ID } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../../entity/User';
import { Post } from '../../entity/Post';
import { CreatePostInput } from './CreatePostInput';

@Resolver(Post)
export class PostResolver {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) {}

  @Query(() => Post, { nullable: true })
  post(@Arg('postId', () => ID) postId: string) {
    return this.postRepository.findOne(postId);
  }

  

  @Mutation(() => Post)
  async addPost(
    @Arg('post') { userId, text }: CreatePostInput
  ): Promise<Post | undefined> {
    try {
      const user = await User.findOne(userId);
      const post = await this.postRepository.create({
        text: text,
        author : user,
        userId: userId
      }).save();

      return post;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  @Mutation(() => Post)
  async likePost(
    @Arg('postId') postId: string
  ) : Promise<Post | undefined> {
    let post = await Post.findOne(postId);
    if (!post){
      return undefined;
    }

    let i = post.likes;
    i++;
    post.likes = i;

    await post.save();

    let updatedPost = await Post.findOne(postId);

   if (!updatedPost){
     return undefined;
   }

   return updatedPost;

  }
}


                             
