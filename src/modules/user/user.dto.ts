import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field((type) => String, { nullable: true })
  _id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field((type) => String, { nullable: true })
  phoneNumber: string;
}
