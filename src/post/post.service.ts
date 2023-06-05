import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { RolesEnum } from '../constants/roles.enum';
import { Blog } from '../blog/entities/blog.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['blog'],
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['blogs'],
    });
  }

  async checkPermission(id: string, userId: string, blogId: string) {
    const user = await this.getUserById(userId);
    const blog = await this.blogRepository.findOneOrFail({
      where: {
        id: blogId,
      },
      relations: ['posts'],
    });
    const posts = blog.posts.map((el) => el.id);
    if (user.role !== RolesEnum.moderator && !posts.includes(id)) {
      throw new HttpException(
        'You dont have a permission for this operation',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }

  async create(input: CreatePostInput): Promise<Post> {
    const user = await this.getUserById(input.userId);
    const blog = await this.blogRepository.findOneOrFail({
      where: {
        id: input.blogId,
      },
      relations: ['posts', 'author'],
    });

    if (blog.author.id !== user.id) {
      throw new HttpException(
        'You dont have a permission for this operation',
        HttpStatus.FORBIDDEN,
      );
    }

    const post = this.postRepository.create({
      name: input.name,
    });
    const createdPost = await this.postRepository.save(post);
    blog.posts.push(post);
    await this.blogRepository.save(blog);
    createdPost.blog = blog;
    await this.postRepository.save(createdPost);
    return this.findOne(createdPost.id);
  }

  async update(
    id: string,
    input: UpdatePostInput,
    userId: string,
  ): Promise<Post> {
    await this.checkPermission(id, userId, input.blogId);
    await this.postRepository.update(id, {
      name: input.name,
    });
    return this.findOne(id);
  }

  async delete(id: string, userId: string, blogId: string): Promise<boolean> {
    await this.checkPermission(id, userId, blogId);
    const [user, post] = await Promise.all([
      this.getUserById(userId),
      this.findOne(id),
    ]);
    await this.blogRepository
      .createQueryBuilder()
      .relation(Blog, 'posts')
      .of(user)
      .remove(post);
    const result = await this.postRepository.delete(id);
    return result.affected > 0;
  }
}
