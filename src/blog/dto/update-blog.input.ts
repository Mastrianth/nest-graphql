import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBlogInput {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;
}
