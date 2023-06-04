import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { RolesEnum } from '../../constants/roles.enum';

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
