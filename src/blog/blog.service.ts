import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { RepositoryEnum } from 'src/constants/repository.enum';

@Injectable()
export class BlogService {
  constructor(
    @Inject(RepositoryEnum.blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async findAll(page: number, limit: number): Promise<Blog[]> {
    const skip = (page - 1) * limit;
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
}
