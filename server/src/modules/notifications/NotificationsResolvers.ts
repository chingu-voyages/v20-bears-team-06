import { Topic } from "./../../types/Topic";
import { ToFollowerNotification } from "./../../entity/ToFollowerNotification";
import { Notification } from "./../../entity/Notification";
// import {
//   AddNotificationPayload,
//   AddToFollowerPayload,
// } from "./types/NotificationPayloads";
import { User } from "../../entity/User";

import {
  Query,
  Resolver,
  Subscription,
  // Root,
  Args,
  ArgsType,
  ID,
  Field,
  Mutation,
} from "type-graphql";
import { NotificationObject } from "./types/NotificationObject";

@ArgsType()
export class SetSeenArgs {
  @Field(() => [ID])
  notificationIds: number[];
}

@ArgsType()
export class NotificationSubArgs {
  @Field(() => ID)
  userId: number;
}

@Resolver()
export class NotificationsResolver {
  @Mutation(() => Boolean)
  async setSeen(@Args() { notificationIds }: SetSeenArgs): Promise<Boolean> {
    let notes = await Notification.createQueryBuilder("notification")
      .where("notification.id IN (:...notificationIds)", { notificationIds })
      .getMany();

    if (notes.length >= 1) {
      notes.forEach(async (note) => {
        note.seen = true;
        await note.save();
      });
    }

    let followNotes = await ToFollowerNotification.createQueryBuilder(
      "toFollowerNotification"
    )
      .where("toFollowerNotification.id IN (:...notificationIds)", {
        notificationIds,
      })
      .getMany();

    if (followNotes.length >= 1) {
      followNotes.forEach(async (note) => {
        note.seen = true;
        await note.save();
      });
    }

    if (notes || followNotes) return true;
    return false;
  }

  /*@Subscription(() => [ToFollowerNotification], {
    topics: Topic.NewToFollowerNotification,
    filter: ({ payload, args }) => {
      let id = Number(args.userId);
      console.log(payload.ownerIds.includes(id));
      return payload.ownerIds.includes(id);
    },
  })
  async toFollowerSub(
    @Args() { userId }: NotificationSubArgs,
    @Root() toFollowerPayload: AddToFollowerPayload
  ): Promise<ToFollowerNotification[] | []> {
    const notifications = await User.getNewFollowerNotifications(userId);
    return notifications;
  }

  @Subscription(() => [Notification], {
    topics: Topic.AddNotification,
    filter: ({ payload, args }) => {
      return payload.userId === args.userId;
    },
  })
  async notificationSub(
    @Args() { userId }: NotificationSubArgs,
    @Root() addNotificationPayload: AddNotificationPayload
  ): Promise<Notification[] | []> {
    const notifications = await User.getNewNotifications(userId);
    return notifications;
  }*/
  @Query(() => [NotificationObject])
  async newNotifications(@Args() { userId }: NotificationSubArgs) {
    const result: any[] = [];
    let followingNotifications = await User.getNewFollowerNotifications(userId);
    let notifications = await User.getNewNotifications(userId);
    if (followingNotifications) {
      followingNotifications.forEach((note) => {
        let obj = note;
        result.push(obj);
      });
    }

    if (notifications) {
      notifications.forEach((note) => {
        let obj: NotificationObject = {
          ...note,
        };
        result.push(obj);
      });
    }

    return result;
  }

  @Subscription(() => [NotificationObject], {
    topics: Topic.NewNotification,
    filter: ({ payload, args }) => {
      if (payload.hasOwnProperty("ownerIds")) {
        let id = Number(args.userId);
        return payload.ownerIds.includes(id);
      }
      return payload.userId === args.userId;
    },
  })
  async notificationsSub(
    @Args() { userId }: NotificationSubArgs
  ): // @Root() payload: any
  Promise<NotificationObject[] | []> {
    const result: NotificationObject[] = [];
    let followingNotifications = await User.getNewFollowerNotifications(userId);
    let notifications = await User.getNewNotifications(userId);
    if (followingNotifications) {
      followingNotifications.forEach((note) => {
        let obj: NotificationObject = {
          ...note,
        };
        result.push(obj);
      });
    }

    if (notifications) {
      notifications.forEach((note) => {
        let obj: NotificationObject = {
          ...note,
        };
        result.push(obj);
      });
    }

    return result;
  }
}
