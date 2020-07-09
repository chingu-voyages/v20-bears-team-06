import { User } from './../../entity/User';
import { ContentFile } from './../../entity/ContentFile';
import { SignedS3Payload } from './../../entity/SignedS3Payload';
import { SignS3Resolver } from './S3Signed';
import { Resolver, Args, ArgsType, Mutation, Query, ID, Field } from 'type-graphql';

@ArgsType()
export class NewFileUploadArgs{
    @Field(() => ID)
    meId: number;

    @Field()
    filename: string;

    @Field()
    filetype: string;

    @Field({nullable:true, defaultValue:false})
    isProfilePic: boolean;
}

const s3Resolver = new SignS3Resolver();
const signS3 = s3Resolver.signS3;



@Resolver()
export class FileUploadResolver{

    @Mutation(() => ContentFile)
    async newFileUpload(@Args() {meId, filename, filetype}:NewFileUploadArgs)
    :Promise<ContentFile|undefined>{

        let returnObject = await signS3({
            filename,
            filetype,
            meId,
            isProfilePic: false
        });

        if (returnObject){
            let file = await ContentFile.createQueryBuilder('file')
            .where('file.filename = :filename', {filename})
            .andWhere('file.signedRequest = :signedRequest', {signedRequest:returnObject.signedRequest})
            .getOne();

            if (!file){
                return undefined;
            }

            return file;
        }
        return;
        
    }

}