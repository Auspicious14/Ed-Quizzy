import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Resource {
  _id: Types.ObjectId;
  @Prop()
  quizName: string;
  @Prop({ type: [String] })
  urls: string[];
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
