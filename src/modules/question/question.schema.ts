import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
class QuestionCourse {
  @Prop()
  _id: string;
  @Prop()
  title: string;
  @Prop()
  level: string;
}
@Schema()
export class Question {
  _id: Types.ObjectId;
  @Prop()
  courseId: string;
  @Prop()
  quizId: string;
  @Prop({ type: QuestionCourse })
  course: {
    id: string;
    title: string;
    level: string;
  };
  @Prop()
  level: string;
  @Prop()
  question: string;
  @Prop()
  answer: string;
  @Prop([String])
  options: string[];
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
