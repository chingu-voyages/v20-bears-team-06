import { Length,  } from "class-validator";
import { Field, InputType, ID} from "type-graphql";

@InputType()
export class PostInput{

    @Field(()=>ID)
    userId: number;
    
    @Field()
    @Length(1,5000,{message:"post text must be between 1 and 5000 characters"})
    text: string;

    



};