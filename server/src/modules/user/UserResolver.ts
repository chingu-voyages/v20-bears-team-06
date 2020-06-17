import { Resolver, Query, ArgsType, ID, Field, Args } from 'type-graphql';
import { User } from '../../entity/User';


@ArgsType()
class GetUserArgs{
    @Field(()=>ID)
    userId: number;
};


@Resolver()
export class UserResolver {
    @Query(() => User, {nullable: true})
    async user(
        @Args() {userId} : GetUserArgs
    ):Promise<User | undefined>{

        return User.findOne(userId) || undefined;

    }
        

    }
    
   
      


  

