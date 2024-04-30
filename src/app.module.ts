import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { QuestionModule } from './modules/question/question.module';
import { LevelModule } from './modules/level/level.module';
import { CloudinaryProvider } from './config/cloudinary.provider';
import { QuizModule } from './modules/quiz/quiz.module';
import { CacheModule } from '@nestjs/cache-manager';
import { QuestionService } from './modules/question/question.service';
import { Question } from './modules/question/question.schema';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URL }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      useFactory: () => ({ max: 20 }),
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CourseModule,
    QuizModule,
    QuestionModule,
    LevelModule,
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule {}
