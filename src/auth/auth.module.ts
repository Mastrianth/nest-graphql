import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: 'tatat',
      signOptions: { expiresIn: '29d' },
    }),
    UserModule,
  ],
  providers: [JwtStrategy, AuthService],
  exports: [
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: 'tatat',
      signOptions: { expiresIn: '29d' },
    }),
    AuthService,
  ],
})
export class AuthModule {}
