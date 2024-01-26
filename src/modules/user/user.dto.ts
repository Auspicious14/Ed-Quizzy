import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@ObjectType()
export class User {
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

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  password: string;
  @Field((type) => String, { nullable: true })
  phoneNumber: string;
}
@InputType()
export class UpdateUserInput {
  @Field((type) => String, { nullable: true })
  @IsOptional()
  firstName?: string;
  @Field((type) => String, { nullable: true })
  @IsOptional()
  lastName?: string;
  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
  @Field((type) => String, { nullable: true })
  @IsOptional()
  phoneNumber?: string;
}
