import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class FollowEvent {
  @Field(() => ID)
  toFollowId: number;

  @Field(() => ID)
  followerId: number;

  @Field(() => Int)
  follower_count: number;

  @Field(() => Int)
  following_count: number;

  @Field(() => Date)
  date: Date;

  @Field()
  follower_name: string;
}
