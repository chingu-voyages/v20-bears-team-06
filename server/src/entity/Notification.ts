import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "date" })
  @Field()
  created_on: string;

  @Field()
  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn()
  @Field(() => User)
  owner: User;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  @RelationId((notification: Notification) => notification.owner)
  ownerId: number;

  @Field({ defaultValue: false })
  @Column({ default: false })
  seen: boolean;

  @Field(() => ID)
  @Column({ nullable: true })
  fromUserId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fromUserName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  message: string;

  @Field({nullable:true})
  @Column({nullable:true})
  avatarUrl: string;
}
