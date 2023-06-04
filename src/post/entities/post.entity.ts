import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from '../../blog/entities/blog.entity';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Blog)
  @ManyToOne(() => Blog)
  blog: Blog;
}
