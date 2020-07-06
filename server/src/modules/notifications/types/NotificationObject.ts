import { ObjectType, Field, ID} from 'type-graphql';

@ObjectType()
export abstract class NotificationObject {
   
    @Field()
    url:string;
    
    @Field()
    type:string;

    @Field(() => ID, {nullable:true})
    fromUserId: number;

    

    @Field()
    message: string;

    @Field(() => ID)
    id: number;

    @Field()
    created_on: string;

    @Field()
    fromUserName: string;

}