import {  Field, ID, InterfaceType } from "type-graphql";


export interface NotificationPayload {
    userId: number;
    
}

@InterfaceType()
export abstract class AddNotificationPayload {
    @Field(() => ID, {nullable:true})
    userId: number;
    
    @Field({nullable:true})
    message: string;

    @Field({nullable:true})
    url: string;

    @Field({nullable:true})
    fromUserId: number;

    @Field({nullable:true})
    fromUserName: string;

    @Field({nullable:true})
    type: string;

    @Field({defaultValue:false})
    toFollowers: boolean;
}

@InterfaceType()
export class AddToFollowerPayload {
    
    @Field(() => [ID!])
    ownerIds: number[];
}





