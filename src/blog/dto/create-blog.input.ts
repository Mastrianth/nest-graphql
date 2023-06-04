import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  userId: string;
}
