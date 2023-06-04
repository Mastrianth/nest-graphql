import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign, verify } from 'jsonwebtoken';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '..//user/entity/user.entity';
import { UserService } from '..//user/user.service';

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

  generateToken(dto: Partial<User>): string {
    return sign(dto, this.JWT_SECRET, { expiresIn: '29d' });
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

  async register(dto: CreateUserDto) {
    const { email } = dto;
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      throw new HttpException(
        'User with this email was created',
        HttpStatus.CONFLICT,
      );
    }
    const createUser = await this.usersService.createUser(dto);
    return {
      access_token: this.jwtService.sign(createUser),
    };
  }
}
