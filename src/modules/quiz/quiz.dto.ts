import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { File, Image } from '../course/course.dto';

@ObjectType()
export class Quiz {
  @Field((type) => String, { nullable: true })
  _id: Types.ObjectId;
  @Field()
  courseId: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field({ nullable: true })
  timeLimit: string;
  @Field()
  level: string;
  @Field()
  status: 'COMPLETED' | 'DRAFT';
  @Field()
  score: number;
  @Field(() => [Image], { nullable: true })
  images: Array<Image>;
}

@InputType()
export class CreateQuizInput {
  @Field()
  courseId: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  timeLimit: string;
  @Field(() => [File], { nullable: true })
  images: Array<File>;
}

@InputType()
export class UpdateQuizInput {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  timeLimit: string;
  @Field({ nullable: true })
  status: 'COMPLETED' | 'DRAFT';
  @Field({ nullable: true })
  score: number;
  @Field(() => [File], { nullable: true })
  images: Array<File>;
}
