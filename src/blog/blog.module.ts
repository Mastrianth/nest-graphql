import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { blogProvider } from './blog.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';

@Module({
  providers: [BlogResolver, BlogService, ...blogProvider],
  exports: [BlogService],
  imports: [DatabaseModule, AuthModule, PostModule],
})
export class BlogModule {}
