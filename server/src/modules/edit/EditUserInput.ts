import { InputType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class EditUserInput {
  @Field(() => ID)
  userId: number;

  @Field({ nullable: true })
  @Length(1, 50, { message: 'school name must be between 1-50 characters' })
  school: string;

  @Field({ nullable: true })
  @Length(1, 50, { message: 'department name must be between 1-50 characters' })
  department: string;

  @Field({ nullable: true })
  @Length(1, 50, { message: 'position must be between 1-50 characters' })
  position: string;

  @Field({ nullable: true })
  @Length(1, 2000, { message: 'about me must be between 1-2000 characters' })
  about_me: string;

  @Field({ nullable: true })
  @Length(1, 2000, { message: 'location must be between 1-50' })
  location: string;

 


}
