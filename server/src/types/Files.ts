import { ContentFile } from './../entity/ContentFile';
import { ObjectType, Field, ID } from "type-graphql";
import { Entity } from 'typeorm';
@ObjectType()
@Entity()
export class Files {
    @Field(() => ID)
    userId: number;

    @Field(() => [ContentFile], {nullable:true})
    files: ContentFile[];


}