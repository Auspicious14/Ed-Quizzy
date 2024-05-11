import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Image } from '../course/course.schema';

@Schema()
export class Quiz {
  _id: Types.ObjectId;
  @Prop()
  courseId: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  timeLimit: string;
  @Prop()
  status: 'COMPLETED' | 'DRAFT';
  @Prop()
  score: number;
  @Prop()
  level: string;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
  @Prop({ type: [Image] })
  images: Image[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
