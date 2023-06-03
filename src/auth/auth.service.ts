import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign, verify } from 'jsonwebtoken';
import { HashService } from 'src/hash/hash.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'your-secret-key';
  private readonly usersService: UserService;
  private readonly jwtService: JwtService;
  private readonly hashService: HashService;

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateToken(userId: string): string {
    const payload = { userId };
    return sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): { userId: string } {
    return verify(token, this.JWT_SECRET) as { userId: string };
  }

  async login(email: string, pass: string) {
    const payload = await this.validateUser(email, pass);
    if (!payload) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
