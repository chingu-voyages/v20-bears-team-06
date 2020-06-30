import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class SignedS3Payload {
  @Field({ nullable: true })
  signedRequest: string;

  @Field({ nullable: true })
  url: string;
}
