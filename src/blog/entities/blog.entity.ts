import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
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
  @OneToMany(() => Post, (post) => post.id, { cascade: true })
  posts: Post[];

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;
}
