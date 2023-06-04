import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BlogResolver, BlogService],
  exports: [BlogService],
  imports: [AuthModule, TypeOrmModule.forFeature([Blog])],
})
export class BlogModule {}
