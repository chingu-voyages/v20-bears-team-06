import { Field, ObjectType, ID } from 'type-graphql';
import { Entity, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Lazy } from '../utils/Lazy';


@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Field(() => Date)
    @CreateDateColumn()
    date : Date;

    @Field(() => String, {nullable:true})
    @Column({nullable:true})
    text: string;

    @Field(() => User)
    @ManyToOne(() => User, {lazy:true})
    author : Lazy<User>;
   

   




   



}
