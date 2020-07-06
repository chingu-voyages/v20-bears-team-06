import { ContentFile } from './ContentFile';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
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

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  users: Lazy<User[]>;

  @ManyToMany(() => ContentFile, file => file.categories, {lazy:true})
  @JoinTable()
  @Field(() => [ContentFile])
  files: Lazy<ContentFile[]>;


}
