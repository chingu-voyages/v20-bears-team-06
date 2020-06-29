import {
  Resolver,
  Query,
  ArgsType,
  ID,
  Field,
  Args,
  Mutation,
  Arg,
} from 'type-graphql';
import { User } from '../../entity/User';
import { EditUserInput } from '../edit/EditUserInput';

@ArgsType()
class GetUserArgs {
  @Field(() => ID)
  userId: number;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Args() { userId }: GetUserArgs): Promise<User | undefined> {
    return User.findOne(userId) || undefined;
  }

  @Mutation(() => User)
  async editUser(
    @Arg('edit')
    { school, department, position, userId, about_me, location}: EditUserInput
  ): Promise<User | undefined> {
    try {
      let user = await User.findOne(userId);
      if (!user) return undefined;

      user.department = department || user.department;
      user.school = school || user.school;
      user.position = position || user.position;
      user.about_me = about_me || user.about_me;
      user.location = location || user.location;

      await user.save();

      let result = await User.findOne(userId);

      return result;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  





  
}
