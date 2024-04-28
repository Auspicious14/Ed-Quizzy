import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field()
  uri: string;
  @Field()
  name: string;
  @Field()
  type: string;
}
@InputType()
export class File {
  @Field()
  base64Str: string;
  @Field()
  filename: string;
  @Field()
  filetype: string;
}

@ObjectType()
export class Course {
  @Field((type) => String, { nullable: true })
  _id: string;
  @Field()
  title: string;
  @Field()
  code: string;
  @Field()
  level: string;
  @Field()
  levelId: string;
  @Field(() => [Image])
  images: Image[];
  @Field()
  description: string;
}

@InputType()
export class CreateCourseInput {
  @Field()
  levelId: string;
  @Field()
  title: string;
  @Field()
  code: string;
  @Field()
  level: string;
  @Field(() => [File])
  images: Array<File>;
  @Field()
  description: string;
}

@InputType()
export class UpdateCourseInput {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  code: string;
  @Field({ nullable: true })
  level: string;
  @Field()
  levelId: string;
  @Field(() => [File], { nullable: true })
  images: Array<File>;
  @Field({ nullable: true })
  description: string;
}
