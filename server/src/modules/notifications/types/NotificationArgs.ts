import { Field, ID, ArgsType } from 'type-graphql';


@ArgsType()
export class NotificationArgs {

    @Field(() => ID)
    userId: number;

    @Field()
    toFollowers: boolean;

    @Field({nullable:true})
    message: string;

    @Field({nullable:true})
    type: string;

    @Field({nullable:true})
    url: string;

    @Field(() => ID,{nullable:true})
    fromUserId: number;

    @Field({nullable:true})
    fromUserName: string;

}