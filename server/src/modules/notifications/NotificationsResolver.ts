import { NewNotifications } from './../../entity/Notifications';
import { Topic } from './../../types/Topic';
import { User } from './../../entity/User';

import {
  Resolver,
  Subscription,
  Root,
  Args,
  ArgsType,
  Query,
  ID,
  Field,
  ResolverFilterData,
} from 'type-graphql';
import { Notification } from '../../entity/Notification';


@ArgsType()
export class NotificationsArgs {
  @Field(() => ID)
  userId: number;
}

@Resolver()
export class NotificationsResolver {
  @Query(() => [Notification])
  async newNotifications(
    @Args() { userId }: NotificationsArgs
  ): Promise<Notification[] | []> {
    let user = await User.findOne(userId, { relations: ['new_notifications'] });
    if (!user) return [];
    let notifications = await user.new_notifications.notifications;
    if (!notifications) {
      return [];
    }
    return notifications;
  }

  @Query(() => [Notification])
  async oldNotifications(
    @Args() { userId }: NotificationsArgs
  ): Promise<Notification[] | []> {
    let user = await User.findOne(userId, { relations: ['old_notifications'] });
    if (!user) return [];
    let notifications = await user.old_notifications.notifications;
    if (!notifications) {
      return [];
    }
    return notifications;
  }

 
}
