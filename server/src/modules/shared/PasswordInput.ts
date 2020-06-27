import { Field, InputType, ClassType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true })
  class PasswordInput extends BaseClass {
    @Field()
    password: string;
  }
  return PasswordInput;
};
