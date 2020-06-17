import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Post } from '../types/Post';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field(()=>[ID],{defaultValue:[]})
  following: [string];

  @Field(() => [ID], {defaultValue : []})
  followers : [string];

  @Field(()=>[Post], {defaultValue:[]})
  posts: [Post];


  
}
