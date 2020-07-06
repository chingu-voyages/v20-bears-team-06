import { User } from "./../../entity/User";
import {
  ArgsType,
  ID,
  Args,
  Resolver,
  Field,
  Mutation,
  // Arg,
  // Ctx,
} from "type-graphql";
import { SignedS3Payload } from "../../entity/SignedS3Payload";
import aws from "aws-sdk";

@ArgsType()
export class S3Args {
  @Field(() => ID)
  meId: number;

  @Field({ nullable: true })
  filetype: string;

  @Field({ nullable: true })
  filename: string;
}

@Resolver()
export class SignS3Resolver {
  @Mutation(() => SignedS3Payload, { nullable: true })
  async signS3(
    @Args() { filename, filetype, meId }: S3Args
  ): Promise<SignedS3Payload | null> {
    const s3Bucket = process.env.S3_BUCKET_NAME || "chingu-bears-06";

    const s3 = new aws.S3({
      region: "us-west-1",
      signatureVersion: "v4",
    });
    console.log(s3Bucket);
    console.log(s3);
    const s3Params = {
      Bucket: s3Bucket,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read",
    };
    let returnObject = new SignedS3Payload();
    returnObject.signedRequest = s3.getSignedUrl("putObject", s3Params);
    returnObject.key = filename;

    await User.addNewFile({
      userId: meId,
      signedRequest: returnObject.signedRequest,
      filetype: filetype,
      filename: filename,
      key: returnObject.key,
    });

    return returnObject;
  }
}
