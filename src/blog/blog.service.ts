import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
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
    });
  }

  async create(input: CreateBlogInput): Promise<Blog> {
    const blog = this.blogRepository.create(input);
    return this.blogRepository.save(blog);
  }

  async update(id: string, input: Partial<Blog>): Promise<Blog> {
    await this.blogRepository.update({ id }, { ...input });
    return this.blogRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.blogRepository.delete(id);
    return true;
  }

  async getAllPostByBlogId(id: string): Promise<Post[]> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    return blog.posts;
  }
}
