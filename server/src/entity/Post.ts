import { Field, ObjectType, ID } from 'type-graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, RelationId, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../entity/User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    @Field(()=>ID)
    id: string;

    @CreateDateColumn()
    @Field()
    postDate: Date;

    

    

    @Column({default: 0})
    @Field({defaultValue: 0})
    likes: number;

    @Column({default: 0})
    @Field({defaultValue: 0})
    shares: number;

    @Field()
    text: string;

    @Field(() => [String], {nullable:true, defaultValue: []})
    images: [string];

    @Field(() => [String],{nullable:true, defaultValue: []})
    files : [string];




}
