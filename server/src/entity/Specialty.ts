import { ContentFile } from './ContentFile';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

import { Lazy } from '../utils/Lazy';

@ObjectType()
@Entity()
export class Specialty extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  @Field(() => String)
  title: string;

  @Column({ default: '' })
  @Field(() => String)
  subtitle: string;

  
  
  @ManyToMany(() => User, user=> user.specialties, { lazy: true, onUpdate:'CASCADE' })
  @JoinTable()
  users: Lazy<User[]>;

  @ManyToMany(() => ContentFile, file => file.categories, {lazy:true})
  @JoinTable()
  @Field(() => [ContentFile])
  files: Lazy<ContentFile[]>;


}
