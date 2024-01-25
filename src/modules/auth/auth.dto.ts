import { Field, InputType, ObjectType } from '@nestjs/graphql';

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
  @Field({ nullable: true })
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  token: string;
  @Field()
  phoneNumber: string;
}
