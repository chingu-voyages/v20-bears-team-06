import { ObjectType, Field, ID} from 'type-graphql';

@ObjectType()
export abstract class NotificationObject {
   
    @Field()
    url:string;
    
    @Field()
    type:string;

    @Field(() => ID, {nullable:true})
    fromUserId: number;

    @Field(() => ID, {nullable:true})
    userId: number;

    @Field()
    message: string;

    @Field(() => ID)
    notificationId: number;

    @Field(() => Date, {defaultValue:Date.now()})
    date: Date;

}