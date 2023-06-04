import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Args('userId') userId: string,
  ) {
    return this.postService.update(updatePostInput.id, updatePostInput, userId);
  }

  @Mutation(() => Post)
  removePost(
    @Args('id') id: string,
    @Args('userId') userId: string,
    @Args('blogId') blogId: string,
  ) {
    return this.postService.delete(id, userId, blogId);
  }
}
