import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from 'src/blog/entities/blog.entity';

@ObjectType()
@Entity()
export class Post {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column()
  name: string;

  @ApiProperty()
  @Field(() => Blog)
  @ManyToOne(() => Blog)
  blog: Blog;
}
