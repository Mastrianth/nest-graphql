import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { userProvider } from './user.provider';
import { HashModule } from 'src/hash/hash.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UserService, UserResolver, ...userProvider],
  imports: [DatabaseModule, HashModule, AuthModule],
})
export class UserModule {}
