import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { SignedS3Payload } from "../../entity/SignedS3Payload";
import aws from "aws-sdk";

@Resolver()
export class SignS3Resolver {
  @Mutation(() => SignedS3Payload, { nullable: true })
  async signS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
  ): Promise<SignedS3Payload | null> {
    const s3Bucket = "chingu-bears-06";

    const s3 = new aws.S3({
      region: "us-west-1",
      signatureVersion: "v4",
    });
    const s3Params = {
      Bucket: s3Bucket,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read",
    };
    const signedRequest = await s3.getSignedUrl("putObject", s3Params);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
    return {
      signedRequest,
      url,
    };
  }
}
