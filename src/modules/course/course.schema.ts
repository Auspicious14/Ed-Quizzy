import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Image {
  @Prop()
  uri: string;

  @Prop()
  name: string;

  @Prop()
  type: string;
}

@Schema()
export class Course {
  _id: Types.ObjectId;
  @Prop()
  levelId: string;
  @Prop()
  title: string;
  @Prop()
  code: string;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
  @Prop()
  level: string;
  @Prop({ type: [Image] })
  images: Image[];
  @Prop()
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
