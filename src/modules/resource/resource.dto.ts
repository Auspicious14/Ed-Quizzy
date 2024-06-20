import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Resource {
  @Field((type) => String)
  _id: Types.ObjectId;
  @Field((type) => String)
  quizName: string;
  @Field((type) => [String])
  urls: string[];
}

@InputType()
export class ResourceInput {
  @Field((type) => String)
  quizId: string;
}
