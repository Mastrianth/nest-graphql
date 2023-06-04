import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from '../hash/hash.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { password } = dto;

    const newUser = this.userRepository.create({
      ...dto,
      password: await this.hashService.createHash(password),
    });
    return this.userRepository.save(newUser);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
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
}
