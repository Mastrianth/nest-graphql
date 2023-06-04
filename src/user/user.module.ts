import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HashModule } from 'src/hash/hash.module';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UserService, UserResolver],
  imports: [HashModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
