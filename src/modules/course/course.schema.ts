import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Course {
  _id: Types.ObjectId;
  @Prop()
  title: string;
  @Prop()
  code: string;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
