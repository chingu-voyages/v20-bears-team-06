import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class FollowerData {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  profilePic_url: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  position: string;

  @Field({ nullable: true })
  department: string;

  @Field({ nullable: true })
  school: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}
