import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    private readonly blogService: BlogService,
    private readonly postService: PostService,
  ) {}

  @Mutation(() => Blog)
  createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  @Query(() => [Blog], { name: 'blog' })
  findAll(
    @Args('page', { nullable: true }) page: number,
    @Args('limit', { nullable: true }) limit: number,
  ) {
    return this.blogService.findAll(page, limit);
  }

  @Query(() => Blog, { name: 'blog' })
  findOne(@Args('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Blog)
  removeBlog(@Args('id') id: string) {
    return this.blogService.delete(id);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() blog: Blog) {
    return this.postService.findByBlogId(blog.id);
  }
}
