import { ContentFile } from './../../entity/ContentFile';
import { SignedS3Payload } from './../../types/SignedS3Payload';
import { pubSub } from './../../redis';
import { ArgsType, ID, Args, Resolver, Field, Mutation, Arg, InterfaceType, ObjectType, InputType, Query} from 'type-graphql';
import { ContentFileResolver } from '../contentfile/ContentFileResolver';
import aws from 'aws-sdk';


@ArgsType()
  export class DownloadS3Args{
    @Field(() => ID)
    fileId: number;
  };


@ArgsType()
export class S3Args {
  @Field(() => ID)
  meId: number;

  @Field({ nullable: true })
  filetype: string;

  @Field({ nullable: true })
  filename: string;

  @Field({nullable:true, defaultValue:false})
  isProfilePic: Boolean;
}











const contentResolver = new ContentFileResolver();
const addFile = contentResolver.newFile;


@Resolver()
export class SignS3Resolver {
  @Mutation(() => SignedS3Payload)
  async signS3(
    @Args() {filename, filetype, meId, isProfilePic }: S3Args
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

    if (isProfilePic!==true){
    let newFile = await addFile({
      userId: meId,
      filename,
      filetype,
      ...returnObject
    }, pubSub);
  };

    return returnObject;
  }

  @Mutation(() => SignedS3Payload)
  async s3download(@Args() {fileId}:DownloadS3Args):
  Promise<SignedS3Payload|null>{
    
    const s3Bucket = process.env.S3_BUCKET_NAME || "chingu-bears-06";

    const s3 = new aws.S3({
      region: "us-west-1",
      signatureVersion: "v4",
    });

    let file = await ContentFile.findOne(fileId);
    if (!file) return null;

    const s3Params ={
      Bucket: s3Bucket,
      Key: file.key,
      Expires : 60,
      ResponseContentDisposition: `attachment; filename="${file.key.split("/")[1]}"`
    };

    const returnObject:SignedS3Payload ={
      signedRequest: s3.getSignedUrl('getObject', s3Params),
      key: s3Params.Key
    }


    return returnObject;

    


  }

 
}
