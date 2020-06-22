import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
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
}
