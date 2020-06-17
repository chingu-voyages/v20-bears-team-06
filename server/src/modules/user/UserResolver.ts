import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class UserResolver {
    @Query(() => User, {nullable: true})
    async user(
        @Arg("userId") userId: string
    ):Promise<User | undefined>{

        return User.findOne({id: userId}) || undefined;

    }
        

    }
    
   
      


  

