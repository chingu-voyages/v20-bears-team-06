import { AddNotificationArgs } from "../modules/user/field_resolvers/FollowResolver";
import { ToFollowerNotification } from "./ToFollowerNotification";
import { Notification } from "./Notification";
import { ContentFile } from "./ContentFile";
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

  @Column({ default: "" })
  @Field(() => String!)
  school: string;

  @Column({ default: "" })
  @Field(() => String!)
  department: string;

  @Column({ default: "" })
  @Field(() => String!)
  position: string;

  @Column({ default: "" })
  @Field(() => String!)
  about_me: string;

  @Column({ default: "" })
  @Field(() => String!)
  location: string;

  @Field({ complexity: 3 })
  employment(@Root() parent: User): string {
    return `${parent.department} ${parent.position}`;
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

  @OneToMany(() => Specialty, (specialty) => specialty.users, {
    lazy: true,
    cascade: true,
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
      let followers = await user.followers;
      let notification = ToFollowerNotification.create({
        message,
        type,
        fromUserId,
        url,
        fromUserName,
        owners: followers,
      }).save();

      if (notification) {
        return notification;
      }
    } else if (toFollowers === false) {
      let user = await this.findOne(userId);
      if (!user) return;
      let notification = await Notification.create({
        message,
        type,
        fromUserId,
        url,
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
    @Args() { userId, key, signedRequest, filetype, filename }: AddNewFileArgs
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
    }
    return [];
  }
}
