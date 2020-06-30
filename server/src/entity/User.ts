import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationCount,
} from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import { Post } from './Post';
import { Specialty } from './Specialty';
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
  @Column('text', { unique: true })
  email: string;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
  @Column()
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;

 

  @Column({ default: '' })
  @Field(() => String!)
  school: string;

  @Column({ default: '' })
  @Field(() => String!)
  department: string;

  @Column({ default: '' })
  @Field(() => String!)
  position: string;

  @Column({ default: ''})
  @Field(() => String!)
  about_me: string;

  @Column({ default: ''})
  @Field(() => String!)
  location: string;


  @Field({complexity:3})
  employment(@Root() parent:User) : string{
    return `${parent.department} ${parent.position}`;
  }


  

  @OneToMany(() => Post, (post) => post.author, { lazy: true , cascade:true})
  @Field(() => [Post])
  posts: Lazy<Post[]>;

  @OneToMany(() => Specialty, (specialty) => specialty.users, { lazy: true, cascade:true})
  @Field(() => [Specialty])
  specialties: Lazy<Specialty[]>;


  @ManyToMany(() => User, user => user.following, {lazy:true, cascade:true})
  @JoinTable()
  @Field(() => [User])
  followers: Lazy<User[]>;

  @ManyToMany(() => User, user => user.followers, {lazy:true})
  following: Lazy<User[]>;

  @RelationCount((user:User) => user.followers)
  @Field()
  follower_count: number;

  @RelationCount((user:User) => user.following)
  @Field()
  following_count: number;



  
  



  }
  

