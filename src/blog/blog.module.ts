import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { AuthModule } from '../auth/auth.module';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';

@Module({
  providers: [BlogResolver, BlogService],
  exports: [BlogService],
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([Blog, User])],
})
export class BlogModule {}
