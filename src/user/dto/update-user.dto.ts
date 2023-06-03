import { Field, InputType, Int } from '@nestjs/graphql';
import { RolesEnum } from '../interface/roles.enum';

@InputType()
export class UpdateUserDto {
  @Field(() => Int)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  role?: RolesEnum;
}
