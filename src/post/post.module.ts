import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  providers: [PostResolver, PostService],
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [],
})
export class PostModule {}
