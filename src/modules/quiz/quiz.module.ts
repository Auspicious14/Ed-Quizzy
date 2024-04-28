import { Module } from '@nestjs/common';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './quiz.schema';
import { CourseService } from '../course/course.service';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    CourseModule,
  ],
  providers: [QuizResolver, QuizService],
  exports: [QuizService],
})
export class QuizModule {}
