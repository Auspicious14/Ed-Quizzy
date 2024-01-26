import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field((type) => String, { nullable: true })
  _id: string;
  @Field()
  title: string;
  @Field()
  code: string;
}

@InputType()
export class CreateCourseInput {
  @Field()
  title: string;
  @Field()
  code: string;
}

@InputType()
export class UpdateCourseInput {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  code: string;
}
