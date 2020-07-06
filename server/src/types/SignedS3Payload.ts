import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class SignedS3Payload {
  @Field()
  signedRequest: string;

  @Field({ nullable: true })
  key: string;
}
