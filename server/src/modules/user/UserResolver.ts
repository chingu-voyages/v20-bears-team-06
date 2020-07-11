import {
  Resolver,
  Query,
  ArgsType,
  ID,
  Field,
  Args,
  Mutation,
  Arg,
  ObjectType
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

@ArgsType()
class FollowingArgs{
  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  meId: number;
}

 @ObjectType()
  export class FollowingPayload{
    @Field({nullable:true})
    isFollowing: boolean;

    @Field({nullable:true})
    isOwnProfile: boolean;

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


  @Query(() => FollowingPayload)
  async following(@Args() {userId, meId}:FollowingArgs):
  Promise<FollowingPayload|Error>{
    const payload = new FollowingPayload();
    let user = await User.findOne(userId,{relations:['followers']});
    if(!user) return new Error('user not found');
    let me = await User.findOne(meId);
    if(!me) return new Error('user not found');
    let userFollowers = user.followerIds;
    if (userFollowers){
      console.log(userFollowers) 
      payload.isFollowing = userFollowers.includes(Number(meId));
    }
    payload.isOwnProfile = userId === meId;
    return payload;

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
