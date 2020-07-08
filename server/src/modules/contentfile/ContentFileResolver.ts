import { ToFollowerNotification } from "./../../entity/ToFollowerNotification";
import { AddToFollowerPayload } from "./../notifications/types/NotificationPayloads";
import { NotificationType } from "../notifications/types/NotificationType";
import { NotificationMessage } from "../notifications/types/NotificationMessage";

import { Topic } from "./../../types/Topic";
import { ContentFile } from "./../../entity/ContentFile";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Arg,
  ArgsType,
  ID,
  Field,
  Subscription,
  ResolverFilterData,
  //   Root,
  PubSub,
  PubSubEngine,
} from "type-graphql";
import { User } from "../../entity/User";
import { FilesPayload } from "../../types/Payloads";
import { Like } from "typeorm";

@ArgsType()
export class NewFileArgs {
  @Field(() => ID)
  userId: number;

  @Field({ nullable: true })
  userUrl: string;

  @Field({ nullable: true })
  filetype: string;

  @Field({ nullable: true })
  filename: string;

  @Field({ nullable: true })
  contentUrl: string;

  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  signedRequest: string;
}

@ArgsType()
export class FilesArgs {
  @Field(() => ID)
  userId: number;
}

@ArgsType()
export class AddNewToFollowerArgs {}

@Resolver()
export class ContentFileResolver {
  @Query(() => [ContentFile])
  async files(
    @Arg("userId", () => ID) userId: number
  ): Promise<ContentFile[] | []> {
    let user = await User.findOne(userId, { relations: ["uploads"] });
    if (user) {
      return user.uploads ? user.uploads : [];
    }

    return [];
  }

  @Query(() => [ContentFile])
  async searchFiles(
    @Arg("searchTerm") searchTerm: string
  ): Promise<ContentFile[] | undefined> {
    return ContentFile.find({
      where: [{ filename: Like(`%${searchTerm}%`) }],
    });
  }

  @Mutation(() => ContentFile)
  async newFile(
    @Args() { userId, filename, filetype, key, signedRequest }: NewFileArgs,
    @PubSub() pubSub: PubSubEngine
  ): Promise<ContentFile | null> {
    let file = await User.addNewFile({
      userId: userId,
      //   userUrl: `/profile/${userId}`,
      //   contentUrl,
      key,
      signedRequest,
      filename,
      filetype,
    });

    const fileNotification = await User.addNotification({
      type: NotificationType.FollowingUpload,
      message: NotificationMessage.FollowingUpload,
      url: `/profile/${userId}`,
      toFollowers: true,
      userId: userId,
      fromUserId: userId,
      fromUserName: await User.getName(userId),
    });

    const payload: FilesPayload = {
      userId: userId,
    };

    if (fileNotification instanceof ToFollowerNotification) {
      let owners = await fileNotification.owners;
      const toFollowerPayload: AddToFollowerPayload = new AddToFollowerPayload();
      toFollowerPayload.ownerIds = owners.map((el) => el.id);
      pubSub.publish(Topic.NewNotification, toFollowerPayload);
    }

    pubSub.publish(Topic.NewFile, payload);
    return file || null;
  }

  @Subscription(() => [ContentFile], {
    nullable: true,
    topics: Topic.NewFile,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<FilesPayload, FilesArgs>) => {
      return payload.userId == args.userId;
    },
  })
  async fileSub(
    // @Root() filesPayload: FilesPayload,
    @Args() { userId }: FilesArgs
  ): Promise<ContentFile[] | []> {
    let files = await ContentFile.createQueryBuilder("file")
      .where("file.ownerId = :userId", { userId })
      .getMany();

    console.log(typeof files);
    return files || [];
  }
}
