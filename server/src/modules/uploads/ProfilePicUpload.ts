import { SignedS3Payload } from "../../types/SignedS3Payload";
import { Resolver, Mutation, Args } from "type-graphql";
import { User } from "../../entity/User";
import { ProfilePicArgs } from "../../entity/User";

@Resolver()
export class ProfilePicUploadResolver {
  @Mutation(() => SignedS3Payload)
  async uploadPic(
    @Args() { userId, filename, filetype }: ProfilePicArgs
  ): Promise<SignedS3Payload> {
    let result = await User.updateProfilePic({ userId, filename, filetype });
    return result!;
  }
}
