import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  userId: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({complexity:3})
  name(@Root() parent:Profile): string {
      return `${parent.firstName} ${parent.lastName}`
  }

  @Field()
  @Column()
  schoolName: string;
  
  

  @Field()
  @Column()
  department: string;

  @Field()
  @Column()
  position: string;


}
