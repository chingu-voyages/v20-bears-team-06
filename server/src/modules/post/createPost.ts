import { createResolver } from '../shared/createResolver';
import { Post } from '../../entity/Post';
import { PostInput } from './PostInput';

export const CreatePostResolver = createResolver('Post', Post, PostInput, Post);
