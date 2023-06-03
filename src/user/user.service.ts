import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IDeletedUserResponce } from './interface/delete-resp.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from 'src/hash/hash.service';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { AuthService } from 'src/auth/auth.service';
import { RepositoryEnum } from 'src/constants/repository.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(RepositoryEnum.user)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly authService: AuthService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { password } = dto;

    const newUser = this.userRepository.create({
      ...dto,
      password: await this.hashService.createHash(password),
    });
    return this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, name, email } = updateUserDto;
    const user = await this.getUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.save({
      ...user,
      name,
      email,
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = this.hashService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authService.generateToken(user.id);
  }
}
