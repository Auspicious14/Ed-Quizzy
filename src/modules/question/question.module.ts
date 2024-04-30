import { Module } from '@nestjs/common';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';
import { CourseService } from '../course/course.service';
import { CourseModule } from '../course/course.module';
import { QuizModule } from '../quiz/quiz.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    CourseModule,
    QuizModule,
    // CacheModule.register(),
  ],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
