import { User } from './../entity/User';
import { Int, ID, InterfaceType, ObjectType, Field } from 'type-graphql';
import { SignedS3Payload } from '../entity/SignedS3Payload';


@ObjectType()
export abstract class EditUserPayload{
    @Field(() => User, {nullable:true})
    user: User;

    @Field(() => Boolean, {nullable:true})
    success: boolean;

    @Field(() =>SignedS3Payload, {nullable:true})
    s3: SignedS3Payload;
}


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









@InterfaceType()
export abstract class FilePayload extends SignedS3Payload {
    @Field(() => ID, {nullable:true})
    userId: number;

    @Field({nullable: true})
    filetype: string;

    @Field({nullable: true})
    filename: string;

    

    

}

@InterfaceType()
export abstract class FilesPayload {
    userId: number;
}













