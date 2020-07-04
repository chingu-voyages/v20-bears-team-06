
import { Topic } from './../../types/Topic';
import { ContentFile } from './../../entity/ContentFile';
import { Resolver, Query, Mutation, Args, Arg, ArgsType, ID, Field, Subscription, ResolverFilterData, Root, PubSub, PubSubEngine } from 'type-graphql';
import { User } from '../../entity/User';
import { FilesPayload } from '../../types/Payloads';

@ArgsType()
export class NewFileArgs {
    @Field(() => ID)
    userId: number;

    @Field({nullable:true})
    url: string;

    @Field({nullable:true})
    filetype: string;

    @Field({nullable:true})
    filename: string;


}

@ArgsType()
export class FilesArgs{
    @Field(() => ID)
    userId: number;
}


@Resolver()
export class ContentFileResolver {

    @Query(() => [ContentFile])
    async files(
        @Arg('userId', () => ID) userId: number
    ): Promise<ContentFile[]|[]>{

        let user = await User.findOne(userId,{relations:['uploads']});
        if(user){
            return user.uploads?user.uploads:[];
        }

        return [];

    }

    @Mutation(() => ContentFile)
    async newFile(
        @Args() {userId, filename, filetype, url }: NewFileArgs,
        @PubSub() pubSub: PubSubEngine
    ): Promise<ContentFile|null>{

        let file = await User.addNewFile({userId, filename, filetype, url});
        const payload: FilesPayload = {
            userId: userId
        };
        pubSub.publish(Topic.NewFile,payload);
        return file;
        
    }

    @Subscription(() => [ContentFile], {nullable:true,
        topics: Topic.NewFile,
        filter: ( { payload, args }: ResolverFilterData<FilesPayload , FilesArgs>) => {
            return payload.userId == args.userId;
        },
    })
    async fileSub(
        @Root() filesPayload: FilesPayload,
        @Args() {userId}: FilesArgs
    ) : Promise<ContentFile[]|[]>{
        
        let files = await ContentFile.createQueryBuilder('file')
        .where('file.ownerId = :userId',{userId})
        .getMany();

        console.log(typeof files);
        return files || [];
    }
    
}