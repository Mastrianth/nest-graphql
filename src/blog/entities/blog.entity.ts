import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType()
@Entity()
export class Blog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Post)
  @JoinColumn()
  @OneToMany(() => Post, (post) => post.blog, { cascade: true, nullable: true })
  posts: Post[];

  @Field(() => User)
  @ManyToOne(() => User, (autor) => autor.blogs, { nullable: true })
  author: User;
}
