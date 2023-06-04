import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterDto } from './interfaces/register.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<{ access_token: string }> {
    return this.authService.login(email, password);
  }

  @Mutation(() => String)
  async register(
    @Args('createUserInput') createUserDto: RegisterDto,
  ): Promise<{ access_token: string }> {
    return this.authService.register(createUserDto);
  }
}
