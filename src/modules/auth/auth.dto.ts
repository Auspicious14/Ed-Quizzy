import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class Login {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class Auth {
  @Field()
  userId: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  token: string;
}
