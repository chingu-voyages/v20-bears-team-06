import { InputType, Field, ID } from 'type-graphql';


@InputType()
export class FollowInput{
    @Field(()=>ID)
    userId: number;

    @Field(() => ID, {nullable:true})
    toFollow: number;

    @Field(() => ID, {nullable:true})
    toUnfollow: number;
}