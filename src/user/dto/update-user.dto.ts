import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { RolesEnum } from '../../constants/roles.enum';

@InputType()
export class UpdateUserDto {
  @IsString()
  @Field()
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
