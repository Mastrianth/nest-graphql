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
import strictEnv from './helpers/strictEnv';

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
      host: strictEnv('DATABASE_HOST'),
      port: +strictEnv('DATABASE_PORT'),
      username: strictEnv('DATABASE_USERNAME'),
      password: strictEnv('DATABASE_PASSWORD'),
      database: strictEnv('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    HashModule,
    BlogModule,
    PostModule,
  ],
})
export class AppModule {}
