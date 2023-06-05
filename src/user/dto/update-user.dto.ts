import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RolesEnum } from '../../constants/roles.enum';

@InputType()
export class UpdateUserDto {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsEnum(RolesEnum)
  @IsOptional()
  @Field({ nullable: true })
  role?: RolesEnum;
}
