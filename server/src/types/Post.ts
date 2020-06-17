import {InterfaceType, Field, ID } from 'type-graphql';

@InterfaceType()
export abstract class Post {
    @Field(() => ID)
    id: string;

    @Field()
    text: string;

    @Field(() => [String], {nullable:true, defaultValue: []})
    images: [string];

    @Field(() => [String],{nullable:true, defaultValue: []})
    files : [string];

    @Field({defaultValue:0})
    likes: number;

    @Field({defaultValue:0})
    shares: number;
}