import { Module } from '@nestjs/common';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './quiz.schema';
import { CourseModule } from '../course/course.module';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/guard/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    CourseModule,
    AuthModule,
  ],
  providers: [QuizResolver, QuizService, JwtStrategy],
  exports: [QuizService],
})
export class QuizModule {}
