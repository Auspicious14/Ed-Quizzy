import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Level {
  @Field((type) => String, { nullable: true })
  _id: string;
  @Field()
  level: string;
}

@InputType()
export class CreateLevelInput {
  @Field()
  level: string;
}

@InputType()
export class UpdateLevelInput {
  @Field({ nullable: true })
  level: string;
}
