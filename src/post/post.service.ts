// post.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Blog } from '../blog/entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findByBlogId(blogId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        id: blogId,
      },
    });
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(input: CreatePostInput): Promise<Post> {
    const post = this.postRepository.create(input);
    return this.postRepository.save(post);
  }

  async update(id: string, input: UpdatePostInput): Promise<Post> {
    await this.postRepository.update(id, input);
    return this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return result.affected > 0;
  }
}
