import { Resolver, Mutation, Arg } from "type-graphql";
import { SignedS3Payload } from "../../types/SignedS3Payload";
import aws from "aws-sdk";

@Resolver()
export class SignS3Resolver {
  @Mutation(() => SignedS3Payload, { nullable: true })
  async signS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
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
    returnObject.signedRequest = await s3.getSignedUrl("putObject", s3Params);
    returnObject.key = filename;

    return returnObject;
  }
}
