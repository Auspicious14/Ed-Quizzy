import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
class QuestionCourse {
  @Field()
  _id: string;
  @Field()
  title: string;
  @Field()
  level: string;
}
@ObjectType()
export class Question {
  @Field((type) => String, { nullable: true })
  _id: Types.ObjectId;
  @Field()
  courseId: string;
  @Field()
  quizId: string;
  @Field((type) => QuestionCourse)
  course: {
    _id: string;
    title: string;
    level: string;
  };
  @Field()
  question: string;
  @Field()
  answer: string;
  @Field((type) => [String])
  options: string[];
}

@InputType()
export class CreateQuestionInput {
  @Field({ nullable: true })
  courseId: string;
  @Field()
  quizId: string;
  @Field({ nullable: true })
  question: string;
  @Field({ nullable: true })
  answer: string;
  @Field((type) => [String], { nullable: true })
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
