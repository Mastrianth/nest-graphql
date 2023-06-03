import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entity/user.entity';

@ObjectType()
@Entity()
export class Blog {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column()
  name: string;

  @ApiProperty()
  @Field(() => Post)
  @OneToMany(() => Post, (post) => post.id, { cascade: true })
  posts: Post[];

  @ApiProperty()
  @Field(() => User)
  @OneToOne(() => User)
  author: User;
}
