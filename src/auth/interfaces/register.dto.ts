import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { RolesEnum } from '../../constants/roles.enum';

@InputType()
export class RegisterDto {
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
