import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entity/user.entity';
import { RolesEnum } from '../constants/roles.enum';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page = 0, limit = 0): Promise<Blog[]> {
    const skip = page > 0 ? (page - 1) * limit : 0;
    return this.blogRepository.find({ skip, take: limit });
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
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

  async create(input: CreateBlogInput): Promise<Blog> {
    const user = await this.getUserById(input.userId);

    const blog = this.blogRepository.create({
      name: input.name,
    });
    const createdBlog = await this.blogRepository.save(blog);
    user.blogs.push(createdBlog);
    await this.userRepository.save(user);
    createdBlog.author = user;
    await this.blogRepository.save(createdBlog);
    return this.findOne(createdBlog.id);
  }

  async checkPermission(id: string, userId: string) {
    const user = await this.getUserById(userId);
    const usersBlog = user.blogs.map((el) => el.id);
    if (user.role !== RolesEnum.moderator && !usersBlog.includes(id)) {
      throw new HttpException(
        'You dont have a permission for this operation',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }

  async update(
    id: string,
    input: Partial<Blog>,
    userId: string,
  ): Promise<Blog> {
    await this.checkPermission(id, userId);
    await this.blogRepository.update({ id }, { ...input });
    return this.findOne(id);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    await this.checkPermission(id, userId);

    const [user, blog] = await Promise.all([
      this.getUserById(userId),
      this.findOne(id),
    ]);
    await this.blogRepository
      .createQueryBuilder()
      .relation(User, 'blogs')
      .of(user)
      .remove(blog);
    await this.blogRepository.delete(id);
    return true;
  }

  async getAllPostByBlogId(id: string): Promise<Post[]> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
      relations: ['posts'],
    });

    return blog.posts;
  }
}
