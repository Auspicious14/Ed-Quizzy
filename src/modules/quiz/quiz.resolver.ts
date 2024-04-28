import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuizInput, Quiz as QuizDto, UpdateQuizInput } from './quiz.dto';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.schema';

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

  @Mutation((returns) => QuizDto, { name: 'generateQuiz' })
  async generateQuiz(
    @Args('courseTitle') courseTitle: string,
    @Args('courseId') courseId: string,
  ): Promise<Quiz> {
    return this.quizService.generateQuiz(courseTitle, courseId);
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
