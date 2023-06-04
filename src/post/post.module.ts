import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../user/entity/user.entity';
import { Blog } from '../blog/entities/blog.entity';

@Module({
  providers: [PostResolver, PostService],
  imports: [TypeOrmModule.forFeature([Post, User, Blog])],
  exports: [],
})
export class PostModule {}
