import { Int, ID, InterfaceType, Field } from 'type-graphql';



@InterfaceType()
export abstract class FollowEventPayload {
    @Field(() => ID)
    toFollowId: number;

    @Field()
    dateString: string;

    @Field(() => ID)
    followerId: number;

    @Field()
    event_type: string;

    @Field(() => Int)
    follower_count: number;

    @Field(() => Int)
    following_count: number;

    @Field()
    follower_name: string;

}






