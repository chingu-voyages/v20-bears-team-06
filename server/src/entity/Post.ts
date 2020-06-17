import { Field, ObjectType, ID } from 'type-graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    @Field(()=>ID)
    postId: string;

    @Field(()=>ID)
    userId: number;

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
