import { Specialty } from "./../../entity/Specialty";
import { ToFollowerNotification } from "./../../entity/ToFollowerNotification";
import { AddToFollowerPayload } from "./../notifications/types/NotificationPayloads";
import { NotificationType } from "../notifications/types/NotificationType";
import { NotificationMessage } from "../notifications/types/NotificationMessage";
import { Topic } from "./../../types/Topic";
import { ContentFile } from "./../../entity/ContentFile";
import { pubSub } from '../../redis';

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
  ObjectType,
} from "type-graphql";
import { User } from "../../entity/User";
import { FilesPayload } from "../../types/Payloads";


@ArgsType()
export class IncDownloadArgs {
  @Field(() => ID)
  fileId: number;
}

@ArgsType()
export class NewFileArgs {
  @Field(() => ID)
  userId: number;

  @Field({ nullable: true })
  filetype: string;

  @Field({ nullable: true })
  filename: string;

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
class EditFileArgs {
  @Field(() => ID)
  fileId: number;

  @Field({ nullable: true, defaultValue: null })
  filename: string;

  @Field({ defaultValue: "" })
  description: string;

  @Field({ defaultValue: "" })
  gradeLevel: string;

  @Field({ defaultValue: "" })
  category: string;
}

@ArgsType()
export class FileActionArgs {
  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  fileId: number;

  @Field()
  actionType: string;
}

@ObjectType()
export class AllFilesPayload {
  @Field(() => [ContentFile], { nullable: true })
  uploads: ContentFile[];

  @Field(() => [ContentFile], { nullable: true })
  savedContent: ContentFile[];

  @Field(() => [ContentFile], { nullable: true })
  favoriteContent: ContentFile[];
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
    @Arg('searchTerm') searchTerm:string
  ):Promise<ContentFile[] | undefined> {
    const byName = await ContentFile.createQueryBuilder('file')
    .leftJoinAndSelect('file.owner','owner')
    .where('LOWER(owner.firstName) like LOWER(:searchTerm)', {searchTerm:`%${searchTerm}%`})
    .orWhere('LOWER(owner.lastName) like LOWER(:searchTerm)', {searchTerm:`%${searchTerm}%`})
    .orWhere('LOWER(file.filename) like LOWER(:searchTerm)', {searchTerm:`%${searchTerm}%`})
    .orWhere('LOWER(file.description) like LOWER(:searchTerm)', {searchTerm:`%${searchTerm}%`})
    .getMany();

    const byCategory = await ContentFile.createQueryBuilder('file')
    .innerJoinAndSelect('file.categories','categories')
    .where('LOWER(categories.title) like LOWER(:searchTerm)',{searchTerm:`%${searchTerm}%`})
    .orWhere('LOWER(categories.subtitle) like (:searchTerm)',{searchTerm:`%${searchTerm}%`})
    .getMany();



    
    let combined = [...byCategory,...byName];
    return combined;
      

  
  }

  @Mutation(() => User)
  async deleteFile(
    @Arg("fileId", () => ID) fileId: number
  ): Promise<User | void> {
    let file = await ContentFile.findOne(fileId);
    if (!file) return;
    let ownerId = file.ownerId;
    let owner = await User.findOne(ownerId, { relations: ["uploads"] });
    if (!owner) return;
    owner.uploads = (await owner.uploads).filter((el) => el.id != fileId);
    await owner.save();
    await file.remove();

    let updated = User.findOne(ownerId);
    if (!updated) return;
    return updated;
  }

  @Mutation(() => User)
  async removeSaved(
    @Arg("fileId", () => ID) fileId: number,
    @Arg("meId", () => ID) meId: number
  ): Promise<User | void> {
    let file = await ContentFile.findOne(fileId, { relations: ["savedBy"] });
    if (!file) return;
    let me = await User.findOne(meId, { relations: ["savedContent"] });
    if (!me) return;
    file.savedBy = (await file.savedBy).filter((el) => el.id !== me?.id);
    me.savedContent = (await me.savedContent).filter(
      (el) => el.id !== file?.id
    );
    await file.save();
    await me.save();
    await me.reload();
    await file.reload();

    return me;
  }

  @Mutation(() => User)
  async removeFavorite(
    @Arg("fileId", () => ID) fileId: number,
    @Arg("meId", () => ID) meId: number
  ): Promise<User | void> {
    let file = await ContentFile.findOne(fileId, {
      relations: ["favoritedBy"],
    });
    if (!file) return;
    let me = await User.findOne(meId, { relations: ["favoriteContent"] });
    if (!me) return;
    file.favoritedBy = (await file.favoritedBy).filter(
      (el) => el.id !== me?.id
    );
    me.favoriteContent = (await me.favoriteContent).filter(
      (el) => el.id !== file?.id
    );
    await file.save();
    await me.save();
    await me.reload();
    await file.reload();

    return me;
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

  @Mutation(() => ContentFile)
  async fileAction(
    @Args() { userId, fileId, actionType }: FileActionArgs
  ): Promise<ContentFile | undefined> {
    let file = await ContentFile.fileAction(
      {
        userId,
        fileId,
        actionType,
      },
      pubSub
    );

    if (!file) return;
    return file;
  }

  @Mutation(() => ContentFile)
  async editFileDetails(
    @Args()
    { fileId, category, filename, gradeLevel, description }: EditFileArgs
  ): Promise<ContentFile | void> {
    let file = await ContentFile.findOne(fileId);
    if (!file) return;
    file.filename =
      filename !== "" && filename !== null ? filename : file.filename;
    file.gradeLevel = gradeLevel !== "" ? gradeLevel : file.gradeLevel;
    file.description = description !== "" ? description : file.description;
    if (category !== "") {
      let spec = await Specialty.findOne({ where: { title: category } });
      if (!spec) {
        spec = Specialty.create({
          title: category,
        });
        (await spec.files).push(file);
      } else {
        (await spec.files).push(file);
      }
      await spec.save();
    }

    await file.save();
    await file.reload();
    if (file) return file;
    return;
  }
}
