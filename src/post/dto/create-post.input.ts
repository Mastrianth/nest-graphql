import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  blogId: string;
}
