import { Notification } from './Notification';
import { ContentFile } from './ContentFile';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationCount,
  RelationId
} from 'typeorm';
import { ObjectType, Field, ID, Root , ArgsType, Args } from 'type-graphql';
import { Post } from './Post';
import { Specialty } from './Specialty';
import { Lazy } from '../utils/Lazy';
import { NewFileArgs } from './../modules/contentfile/ContentFileResolver';

@ArgsType()
export class NewNotificationArgs{
    @Field(() => ID)
    userId: number;

    @Field(() => ID)
    fromUserId: number;

    @Field()
    type: string;

    @Field()
    message:string;

    
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
  @Column('text', { unique: true })
  email: string;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
  @Column()
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;

  @Column({ default: '' })
  @Field(() => String!)
  school: string;

  @Column({ default: '' })
  @Field(() => String!)
  department: string;

  @Column({ default: '' })
  @Field(() => String!)
  position: string;

  @Column({ default: '' })
  @Field(() => String!)
  about_me: string;

  @Column({ default: '' })
  @Field(() => String!)
  location: string;

  @Field({ complexity: 3 })
  employment(@Root() parent: User): string {
    return `${parent.department} ${parent.position}`;
  }


 




  @OneToMany(() => ContentFile, file => file.owner, {lazy:true})
  @Field(() => [ContentFile])
  uploads: Lazy<ContentFile[]>;

  @RelationCount((user: User) => user.uploads)
  @Field()
  upload_count: number;

  @OneToMany(() => Notification, notification => notification.user, {lazy:true})
  @Field(() => [Notification])
  notifications: Lazy<Notification[]>;

  @RelationId((user:User)=>user.uploads)
  @Field(() => [ID!])
  uploadIds: [number];

  @RelationId((user:User)=>user.notifications)
  @Field(() => [ID!])
  notificationsId: [number]




  @OneToMany(() => Post, (post) => post.author, { lazy: true, cascade: true })
  @Field(() => [Post])
  posts: Lazy<Post[]>;


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

  @ManyToMany(() => User, (user) => user.followers, { lazy: true })
  following: Lazy<User[]>;

  @RelationCount((user: User) => user.followers)
  @Field()
  follower_count: number;

  @RelationCount((user: User) => user.following)
  @Field()
  following_count: number;


  static async addNewFile({ userId, url, filetype, filename }: NewFileArgs)
  : Promise<ContentFile|null>
  {
    let user = await this.findOne(userId);
    const file = await ContentFile.create({
      url,
      filetype,
      filename,
      owner: user

    }).save();


    if (file) return file;
    return null;
    

  }

  static async addNewNotification(@Args() {userId, type, message, fromUserId }: NewNotificationArgs):
  Promise<Notification|null>{
        let user = await this.findOne(userId);
        let fromUser = await this.findOne(fromUserId);
        const name = fromUser?.name(fromUser)
        let notification = await Notification.create({
          user: user,
          fromUserId,
          message,
          type,
          url: `/profile/${fromUserId}`,
          fromUserName: name


        }).save();

        return notification||null;


  }

}
