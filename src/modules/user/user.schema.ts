import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;
  @Prop({ validators: { unique: true } })
  email: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  password: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  createdAt: number;
  @Prop()
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
