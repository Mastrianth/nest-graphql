import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { BlogModule } from './blog/blog.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    RolesModule,
    BlogModule,
    BlogPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
