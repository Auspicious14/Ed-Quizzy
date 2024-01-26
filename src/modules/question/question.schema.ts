import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Question {
  _id: Types.ObjectId;
  @Prop()
  courseId: string;
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
