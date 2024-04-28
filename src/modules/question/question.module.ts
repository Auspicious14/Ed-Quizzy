import { Module } from '@nestjs/common';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';
import { CourseService } from '../course/course.service';
import { CourseModule } from '../course/course.module';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    CourseModule,
    QuizModule,
  ],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
