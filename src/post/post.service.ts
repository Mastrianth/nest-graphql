// post.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Blog } from 'src/blog/entities/blog.entity';
import { RepositoryEnum } from 'src/constants/repository.enum';

@Injectable()
export class PostService {
  constructor(
    @Inject(RepositoryEnum.post)
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

  async findAll(page: number, limit: number): Promise<Post[]> {
    const skip = (page - 1) * limit;
    return this.postRepository.find({ skip, take: limit });
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

  async findBlogByPostId(postId: string): Promise<Blog> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.blog', 'blog')
      .where('post.id = :postId', { postId })
      .getOne()
      .then((post) => post.blog);
  }
}
