import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Question {
  @Field((type) => String, { nullable: true })
  _id: Types.ObjectId;
  @Field()
  courseId: string;
  @Field()
  question: string;
  @Field()
  answer: string;
  @Field((type) => [String])
  options: string[];
}

@InputType()
export class CreateQuestionInput {
  @Field()
  courseId: string;
  @Field()
  question: string;
  @Field()
  answer: string;
  @Field((type) => [String])
  options: string[];
}

@InputType()
export class UpdateQuestionInput {
  @Field({ nullable: true })
  question: string;
  @Field({ nullable: true })
  answer: string;
  @Field((type) => [String], { nullable: true })
  options: string[];
}
