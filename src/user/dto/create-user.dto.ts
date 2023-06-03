import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { RolesEnum } from '../interface/roles.enum';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsEnum(RolesEnum)
  @Field()
  role: RolesEnum;
}
