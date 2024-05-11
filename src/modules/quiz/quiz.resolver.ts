import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuizInput, Quiz as QuizDto, UpdateQuizInput } from './quiz.dto';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.schema';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/guard';
import { User } from '../user/user.schema';
import { CurrentUser } from '../auth/guard/current.user';

@Resolver((of) => QuizDto)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  @Mutation((returns) => QuizDto, { name: 'createQuiz' })
  async createQuiz(@Args('payload') payload: CreateQuizInput): Promise<Quiz> {
    return this.quizService.createQuiz(payload);
  }

  @Mutation((returns) => QuizDto, {
    name: 'updateQuiz',
    nullable: true,
  })
  async updateQuiz(
    @Args('id') id: string,
    @Args('payload') payload: UpdateQuizInput,
  ): Promise<Quiz> {
    return this.quizService.updateQuiz(id, payload);
  }

  @Mutation((returns) => Boolean, { name: 'deleteQuiz' })
  async deleteQuiz(@Args('id') id: string): Promise<Boolean> {
    return this.quizService.deleteQuiz(id);
  }

  @Mutation((returns) => Boolean, { name: 'deleteAllQuiz' })
  async deleteAllQuiz(): Promise<Boolean> {
    return this.quizService.deleteAllQuiz();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => QuizDto, { name: 'generateQuiz' })
  async generateQuiz(
    @CurrentUser() user: User, // Inject user ID with key 'id'
    @Args('courseTitle') courseTitle: string,
    @Args('courseId') courseId: string,
  ): Promise<Quiz> {
    return this.quizService.generateQuiz(user, courseTitle, courseId);
  }

  @Query((returns) => [QuizDto], { name: 'getQuizes' })
  async getQuizes(): Promise<Quiz[]> {
    return this.quizService.getQuizes();
  }

  @Query((returns) => [QuizDto], { name: 'getQuizByCourse' })
  async getQuizByCourse(@Args('courseId') courseId: string): Promise<Quiz[]> {
    return this.quizService.getQuizByCourse(courseId);
  }

  @Query((returns) => QuizDto, { name: 'getQuizById' })
  async getQuizById(@Args('id') id: string): Promise<Quiz> {
    return this.quizService.getQuizById(id);
  }
}
