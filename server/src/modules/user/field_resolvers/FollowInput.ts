import { InputType, Field, ID } from 'type-graphql';


@InputType()
export class FollowInput{
    @Field(()=>ID)
    userId: string;

    @Field(() => ID)
    toFollow: string;
}