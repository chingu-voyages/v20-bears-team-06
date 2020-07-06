import { Lazy } from '../utils/Lazy';
import { User } from './User';
import { ObjectType, Field, ID } from "type-graphql";
import { CreateDateColumn, BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationId } from "typeorm";


@ObjectType()
@Entity()
export class ToFollowerNotification extends BaseEntity{
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;


    @CreateDateColumn({type:'date'})
    @Field()
    created_on: string;

    @Field({nullable:true})
    @Column({nullable:true})
    type: string;

    @ManyToMany(() => User, user => user.notifications_fromFollowers, {lazy:true, onUpdate:'CASCADE'})
    @JoinTable()
    owners: Lazy<User[]>;


    @RelationId((ToFollowerNotification:ToFollowerNotification)=> ToFollowerNotification.owners)
    ownerIds: number[];

    @Field({defaultValue:false})
    @Column({default:false})
    seen: boolean;

    @Field(() => ID, {nullable:true})
    @Column({nullable:true})
    fromUserId: number;

    @Field({nullable:true})
    @Column({nullable:true})
    url: string;

    
    @Field({nullable:true})
    @Column({nullable:true})
    fromUserName: string;

    @Field({nullable:true})
    @Column({nullable:true})
    message: string;

    
}