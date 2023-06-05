import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field()
  name?: string;

  @IsString()
  @Field()
  blogId: string;
}
