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
import { NotificationPayload } from '../../types/Payloads';


@ArgsType()
export class NotificationsArgs {
  @Field(() => ID)
  userId: number;
}

@Resolver()
export class NotificationsResolver {
  
  @Subscription(() => [Notification], {nullable:true, 
  topics: [Topic.FollowEvent, Topic.NewFile, Topic.NewDownload, Topic.NewUpload],
  filter : ({ payload, args }: ResolverFilterData<NotificationPayload , NotificationsArgs>)=>{
   console.log(payload.userId,args.userId);
   return true;
  }
})
  async notificationSub(
    @Root() payload: NotificationPayload,
    @Args() { userId } : NotificationsArgs
  ): Promise<Notification[]|null>{
    let notifications = await Notification.createQueryBuilder('notification')
    .where('notification.userId = :userId', {userId})
    .getMany();

    return notifications || null;
  }

 
}
