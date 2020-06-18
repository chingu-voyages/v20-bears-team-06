import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Post } from './Post';
import { Lazy } from '../utils/Lazy';

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

  @OneToMany(() => Post, post => post.author, {lazy:true})
  @Field(() => [Post])
  posts: Lazy<Post[]>;
  
  

 


  @Field({nullable:true, defaultValue:""})
  school: string;

  @Field({nullable:true,defaultValue:""})
  department: string;

  @Field({nullable:true,defaultValue:""})
  position: string;


  
}
