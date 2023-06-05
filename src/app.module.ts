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
      host: 'db-postgresql-fra1-23515-do-user-13296757-0.b.db.ondigitalocean.com',
      port: 5432,
      username: 'doadmin',
      password: 'AVNS_cazWzMhL8fUb9RsQV5M',
      database: 'defaultdb',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      ssl: {
        ca: readFileSync(join(__dirname, '../ca-certificate.crt')),
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
