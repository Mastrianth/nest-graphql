import { Field, InputType, Int } from '@nestjs/graphql';
import { RolesEnum } from '../interface/roles.enum';
import { IsEnum, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsString()
  @Field(() => Int)
  id: string;

  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @Field({ nullable: true })
  email?: string;

  @IsEnum(RolesEnum)
  @Field({ nullable: true })
  role?: RolesEnum;
}
