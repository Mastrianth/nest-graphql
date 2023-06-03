import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  @IsString()
  @ApiProperty()
  name: string;
}
