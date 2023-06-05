import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { HashModule } from './hash/hash.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-chuunendvk4oliu0g4t0-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'holy_user',
      password: 'uynr12ke56uaWk9vfYyQD5eBepPnrYEs',
      database: 'holy_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    HashModule,
    BlogModule,
    PostModule,
  ],
})
export class AppModule {}
