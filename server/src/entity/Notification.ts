import { Lazy } from './../utils/Lazy';
import { User } from './User';

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn,  CreateDateColumn, ManyToOne, RelationId } from 'typeorm';
import { ObjectType, Field, ID, ArgsType } from 'type-graphql';




@Entity()
@ObjectType()
export class Notification extends BaseEntity {

   

    @PrimaryGeneratedColumn()
    @Field(() => ID, {nullable:true})
    id:number;

    @Column({default:new Date().toString()})
    @Field({defaultValue: new Date().toString()})
    date: string;

    @ManyToOne(() => User, user => user.notifications, {eager:true, cascade:true})
    @Field(() => User)
    user: User;

    @RelationId((notification:Notification) => notification.user)
    @Field(() => ID, {nullable:true})
    @Column({nullable:true})
    userId: number;

    @Column({default:false})
    @Field({defaultValue:false})
    seen: boolean;

    @Column({nullable:true})
    @Field(() => ID)
    fromUserId: number;

    @Column({nullable:true})
    @Field()
    fromUserName: string;

    @Column({nullable:true})
    @Field()
    type: string;

    @Column({nullable:true})
    @Field()
    message: string;

    @Column({nullable:true})
    @Field()
    url: string;

    @Field(() => ID)
    static findNewByUserId(userId:number){
        this.createQueryBuilder('notification')
        .where('notification.user.id = :userId', {userId})
        .andWhere('notification.seen = :seen', {seen:false})
        .getMany();       
    }

    



   


}