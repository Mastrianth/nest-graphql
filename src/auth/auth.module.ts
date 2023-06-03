import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import strictEnv from 'src/helpers/strictEnv';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: strictEnv('SIGN_IN_TOKEN_SECRET'),
      signOptions: { expiresIn: '29d' },
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
