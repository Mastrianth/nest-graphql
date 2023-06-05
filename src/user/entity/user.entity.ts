import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { RolesEnum } from '../../constants/roles.enum';
import { Blog } from '../../blog/entities/blog.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  role: RolesEnum;

  @Field(() => Blog)
  @OneToMany(() => Blog, (blog) => blog.author, {
    cascade: true,
    nullable: true,
  })
  blogs: Blog[];
}
