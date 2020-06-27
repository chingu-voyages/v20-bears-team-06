import { InputType, Field, ID } from 'type-graphql';


@InputType()
export class SpecialtyInput{
    @Field()
    title: string;

    @Field({nullable:true})
    subtitle: string;

    @Field(() => ID, {nullable:true})
    userId: string;

    @Field(() => ID, {nullable: true})
    postToAdd: string;
}