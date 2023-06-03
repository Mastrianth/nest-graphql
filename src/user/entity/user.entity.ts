import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from 'src/blog/entities/blog.entity';
import { RolesEnum } from '../interface/roles.enum';

@ObjectType()
@Entity()
export class User {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column()
  name: string;

  @ApiProperty()
  @Field()
  @Column()
  email: string;

  @ApiProperty()
  @Field()
  @Column()
  password: string;

  @ApiProperty()
  @Field()
  @Column()
  role: RolesEnum;

  @ApiProperty()
  @Field(() => Blog)
  @OneToOne(() => Blog)
  blog: Blog;
}
