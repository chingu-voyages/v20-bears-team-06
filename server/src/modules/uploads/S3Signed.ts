import { pubSub } from "./../../redis";
import { ArgsType, ID, Args, Resolver, Field, Mutation } from "type-graphql";
import { ContentFileResolver } from "../contentfile/ContentFileResolver";
import { SignedS3Payload } from "../../types/SignedS3Payload";
import aws from "aws-sdk";

@ArgsType()
export class S3Args {
  @Field(() => ID)
  meId: number;

  @Field({ nullable: true })
  filetype: string;

  @Field({ nullable: true })
  filename: string;

  @Field({ nullable: true, defaultValue: false })
  isProfilePic: Boolean;
}

const contentResolver = new ContentFileResolver();
const addFile = contentResolver.newFile;

@Resolver()
export class SignS3Resolver {
  @Mutation(() => SignedS3Payload, { nullable: true })
  async signS3(
    @Args() { filename, filetype, meId, isProfilePic }: S3Args
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

    if (isProfilePic !== true) {
      await addFile(
        {
          userId: meId,
          filename,
          filetype,
          ...returnObject,
        },
        pubSub
      );
    }

    return returnObject;
  }
}
