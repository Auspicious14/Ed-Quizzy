import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Level {
  _id: Types.ObjectId;
  @Prop()
  level: string;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
