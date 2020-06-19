import { InputType, Field, ID} from 'type-graphql';
import { Post } from '../../entity/Post';
import { Length } from 'class-validator';

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  @Length(1, 5000, { message: 'text must be between 1 and 5000 characters' })
  text: string;

  @Field(() => ID)
  userId: string;

  
}
