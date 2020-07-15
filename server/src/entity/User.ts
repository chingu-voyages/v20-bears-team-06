import { AddNotificationArgs } from "../modules/user/field_resolvers/FollowResolver";
import { ToFollowerNotification } from "./ToFollowerNotification";
import { Notification } from "./Notification";
import { ContentFile } from "./ContentFile";
import { awsImageEndpoint } from "../modules/constants/awsImageEndpoint";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationCount,
  RelationId,
} from "typeorm";
import { ObjectType, Field, ID, Root, ArgsType, Args, Arg } from "type-graphql";
import { Post } from "./Post";
import { Specialty } from "./Specialty";
import { Lazy } from "../utils/Lazy";
import { SignS3Resolver } from "../modules/uploads/S3Signed";

@ArgsType()
export class NewNotificationArgs {
  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  fromUserId: number;

  @Field()
  type: string;

  @Field()
  message: string;
}

@ArgsType()
export class GetIdsArgs {
  @Field(() => ID)
  userId: number;
}

@ArgsType()
export class AddNewFileArgs {
  @Field(() => ID)
  userId: number;

  @Field()
  key: string;

  @Field()
  signedRequest: string;

  @Field()
  filetype: string;

  @Field()
  filename: string;
}

@ArgsType()
export class ProfilePicArgs {
  @Field(() => ID)
  userId: number;

  @Field()
  filename: string;

  @Field()
  filetype: string;
}

@ArgsType()
export class AddSpecialtyArgs {
  @Field(() => ID)
  userId: number;

  @Field()
  title: string;

  @Field()
  subtitle: string;
}

const s3Resolver = new SignS3Resolver();
const signS3 = s3Resolver.signS3;

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  school: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  department: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  profilePic_url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  position: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  about_me: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  location: string;

  @Field()
  employment(@Root() parent: User): string {
    return `${parent.department || ""} ${parent.position || ""}` || "";
  }

  @OneToMany(() => ContentFile, (file) => file.owner, { lazy: true })
  @Field(() => [ContentFile])
  uploads: Lazy<ContentFile[]>;

  @RelationCount((user: User) => user.uploads)
  @Field()
  upload_count: number;

  @RelationId((user: User) => user.uploads)
  @Field(() => [ID!])
  uploadIds: [number];

  @OneToMany(() => Post, (post) => post.author, { lazy: true, cascade: true })
  @Field(() => [Post])
  posts: Lazy<Post[]>;

  @OneToMany(() => Notification, (notification) => notification.owner, {
    lazy: true,
    cascade: true,
  })
  @Field(() => [Notification])
  notifications: Lazy<Notification[]>;

  @Field(() => [ID])
  @RelationId((user: User) => user.notifications)
  notificationIds: number[];

  @ManyToMany(
    () => ToFollowerNotification,
    (fromFollowerNotificaton) => fromFollowerNotificaton.owners,
    { lazy: true }
  )
  @Field(() => [ToFollowerNotification])
  notifications_fromFollowers: Lazy<ToFollowerNotification[]>;

  @Field(() => [ID])
  @RelationId((user: User) => user.notifications_fromFollowers)
  notification_fromFollowersIds: number[];

  @ManyToMany(() => ContentFile, (contentFile) => contentFile.savedBy, {
    lazy: true,
  })
  @Field(() => [ContentFile])
  savedContent: Lazy<ContentFile[]>;

  @RelationId((user: User) => user.savedContent)
  @Field(() => [ID])
  savedContentIds: number[];

  @ManyToMany(() => ContentFile, (contentFile) => contentFile.favoritedBy, {
    lazy: true,
  })
  @Field(() => [ContentFile])
  favoriteContent: Lazy<ContentFile[]>;

  @RelationId((user: User) => user.favoriteContent)
  @Field(() => [ID])
  favoriteContentIds: number[];

  @ManyToMany(() => Specialty, (specialty) => specialty.users, {
    lazy: true,
  })
  @Field(() => [Specialty])
  specialties: Lazy<Specialty[]>;

  @ManyToMany(() => User, (user) => user.following, {
    lazy: true,
    cascade: true,
  })
  @JoinTable()
  @Field(() => [User])
  followers: Lazy<User[]>;

  @RelationId((user: User) => user.followers)
  @Field(() => [ID])
  followerIds: number[];

  @ManyToMany(() => User, (user) => user.followers, { lazy: true })
  @Field(() => [User])
  following: Lazy<User[]>;

  @RelationCount((user: User) => user.followers)
  @Field()
  follower_count: number;

  @RelationCount((user: User) => user.following)
  @Field()
  following_count: number;

  static async getName(@Arg("userId") userId: number): Promise<string | ""> {
    let user = await this.findOne(userId);
    if (!user) return "";
    return `${user.firstName} ${user.lastName}`;
  }

  static async addNotification(
    @Args()
    {
      userId,
      message,
      type,
      fromUserId,
      url,
      fromUserName,
      toFollowers,
    }: AddNotificationArgs
  ): Promise<ToFollowerNotification | Notification | undefined> {
    if (toFollowers === true) {
      let user = await this.findOne(userId, { relations: ["followers"] });
      if (!user) return;
      let avatarUrl = user.profilePic_url;
      let followers = await user.followers;
      let notification = ToFollowerNotification.create({
        message,
        type,
        fromUserId,
        url,
        avatarUrl,
        fromUserName,
        owners: followers,
      }).save();

      if (notification) {
        return notification;
      }
    } else if (toFollowers === false) {
      let user = await this.findOne(userId);
      let fromUser = await User.findOne(fromUserId);
      if (!user) return;
     
      let avatarUrl =fromUser?.profilePic_url;
      let notification = await Notification.create({
        message,
        type,
        fromUserId,
        url,
        avatarUrl,
        fromUserName,
        owner: user,
      }).save();

      if (notification) {
        return notification;
      }
    }
    return;
  }

  static async addNewFile(
    @Args() { userId, key, signedRequest, filetype, filename }: AddNewFileArgs,
  ): Promise<ContentFile | undefined> {
    let user = await this.findOne(userId);
    if (!user) return;
    let uploads = await user.uploads;
    if (!uploads) return;
    let newFile = await ContentFile.create({
      owner: user,
      signedRequest,
      key,
      filetype,
      filename,
    }).save();

    uploads = uploads.concat([newFile]);
    user.uploads = uploads;
    await user.save();
    if (user && newFile) {
      return newFile;
    }
    return;
  }

  static async getNewFollowerNotifications(@Arg("userId") userId: number) {
    let user = await this.findOne(userId);
    if (user) {
      console.log(user);
      let notifications = (await user.notifications_fromFollowers).filter(
        (el) => el.seen === false
      );
      if (notifications) return notifications;
    }
    return [];
  }

  static async getNewNotifications(@Arg("userId") userId: number) {
    let user = await this.findOne(userId);
    if (user) {
      let notifications = (await user.notifications).filter(
        (el) => el.seen === false
      );
      if (notifications) return notifications;
      else return [];
    } else return [];
  }

  static async updateProfilePic(
    @Args() { userId, filetype, filename }: ProfilePicArgs
  ) {
    let user = await this.findOne(userId);
    if (!user) return;

    let requestObject = await signS3({
      meId: userId,
      filename,
      filetype,
      isProfilePic: true,
    });

    if (requestObject) {
      user.profilePic_url = `${awsImageEndpoint}${requestObject.key}`;
    }

    await user.save();
    return requestObject;
  }

  static async addSpecialty(
    @Args() { userId, title, subtitle }: AddSpecialtyArgs
  ): Promise<User | undefined> {
    let user = await this.findOne(userId);
    if (!user) return;
    let specialties = await user.specialties;
    if (!specialties) return;

    let existingSpecialty = await Specialty.createQueryBuilder("specialty")
      .where("specialty.title = :title", { title })
      .andWhere("specialty.subtitle = :subtitle", { subtitle })
      .getOne();

    if (!existingSpecialty) {
      const newSpecialty = await Specialty.create({
        subtitle,
        title,
      });
      if (!newSpecialty) return;
      (await newSpecialty.users).push(user);
      await newSpecialty.save();
      (await user.specialties).push(newSpecialty);
      await user.save();
    } else if (existingSpecialty) {
      (await existingSpecialty.users).push(user);
      await existingSpecialty.save();
      (await user.specialties).push(existingSpecialty);
      await user.save();
    }

    let updatedUser = await this.findOne(userId);

    return updatedUser;
  }
}
