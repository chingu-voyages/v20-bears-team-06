import { FileUploadResolver } from './../modules/uploads/FileUploadResolver';
import { NotificationsResolver } from './../modules/notifications/NotificationsResolvers';
import { ContentFileResolver } from './../modules/contentfile/ContentFileResolver';
import { CreateUserResolver } from '../modules/user/CreateUser';
import { RegisterResolver } from '../modules/user/Register';
import { MeResolver } from '../modules/user/Me';
import { LogoutResolver } from '../modules/user/Logout';
import { LoginResolver } from '../modules/user/Login';
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword';
import { ConfirmUserResolver } from '../modules/user/ConfirmUser';
import { ChangePasswordResolver } from '../modules/user/ChangePassword';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../modules/user/UserResolver';
import { PostResolver } from '../modules/post/PostResolver';
import { PostsResolver } from '../modules/user/field_resolvers/PostsResolver';
import { FollowResolver } from '../modules/user/field_resolvers/FollowResolver';
import { SpecialtyResolver } from '../modules/specialty/SpecialtyResolver';
import { SpecialtiesResolver } from '../modules/user/field_resolvers/SpecialtiesResolver';
import { SignS3Resolver } from '../modules/uploads/S3Signed';
import { Container } from 'typedi';
import { pubSub } from '../redis';



export const createSchema = () =>
  buildSchema({
    resolvers: [
      FileUploadResolver,
      ChangePasswordResolver,
      ConfirmUserResolver,
      PostResolver,
      PostsResolver,
      ForgotPasswordResolver,
      FollowResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      SpecialtyResolver,
      SpecialtiesResolver,
      CreateUserResolver,
      UserResolver,
      SignS3Resolver,
      ContentFileResolver,
      NotificationsResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
    container: Container,
    validate: false,
    pubSub,
  });

/*export async function buildTdR(){
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      PostResolver,
      PostsResolver,
      ForgotPasswordResolver,
      FollowResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      SpecialtyResolver,
      SpecialtiesResolver,
      CreateUserResolver,
      ProfilePictureResolve,
      ProfilePictureResolver,
      UserResolver,
      
      
      
      ,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
    container: Container,
    validate: false,
    pubSub
    
  });

  console.log(typeDefs, resolvers);

} */
