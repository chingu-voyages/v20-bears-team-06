import {
  Resolver,
  Query,
  ArgsType,
  ID,
  Field,
  Args,
  Mutation,
  Arg,
} from "type-graphql";
import { User } from "../../entity/User";
import { EditUserInput } from "../edit/EditUserInput";
import { Like } from "typeorm";
import { EditUserPayload } from '../../types/Payloads';

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

  @Query(() => [User])
  async users(
    @Arg("searchTerm") searchTerm: string
  ): Promise<User[] | undefined> {
    return User.find({
      where: [
        { firstName: Like(`%${searchTerm}%`) },
        { lastName: Like(`%${searchTerm}%`) },
        { school: Like(`%${searchTerm}%`) },
        { department: Like(`%${searchTerm}%`) },
        { position: Like(`%${searchTerm}%`) },
        { location: Like(`%${searchTerm}%`) },
      ],
    });
  }

  @Mutation(() => EditUserPayload)
  async editUser(
    @Arg('edit')
    { school, department, position, userId, about_me, location, filename, filetype }: EditUserInput
  ): Promise<EditUserPayload|undefined> {
    try {
      let user = await User.findOne(userId);
      if(!user) return;
      

      user!.department = department || user!.department;
      user!.school = school || user!.school;
      user!.position = position || user!.position;
      user!.about_me = about_me || user!.about_me;
      user!.location = location || user!.location;

      await user!.save();

      let result = await User.findOne(userId);
      if(!result) return;
      let s3 = await User.updateProfilePic({userId, filetype, filename});
      if(!s3) return;
      
      user = await User.findOne(userId);
      if (!user) return;
      
        const payload:EditUserPayload = {
          s3,
          user,
          success:true
        };
        return payload;
      
      

      
    } catch (err) {
      console.log(err);
      return;
      
    }
  }
}
