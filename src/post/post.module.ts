import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { postProvider } from './post.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [PostResolver, PostService, ...postProvider],
  imports: [DatabaseModule],
  exports: [PostService],
})
export class PostModule {}
