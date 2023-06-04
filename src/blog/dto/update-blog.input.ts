import { IsString } from 'class-validator';
import { CreateBlogInput } from './create-blog.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @Field({ nullable: true })
  name?: string;

  @Field()
  @IsString()
  userId: string;
}
