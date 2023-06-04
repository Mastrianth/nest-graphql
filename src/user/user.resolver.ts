import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  // @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
