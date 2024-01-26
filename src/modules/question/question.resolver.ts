import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateQuestionInput,
  Question as QuestionDto,
  UpdateQuestionInput,
} from './question.dto';
import { QuestionService } from './question.service';
import { Question } from './question.schema';

@Resolver((of) => QuestionDto)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Mutation((returns) => QuestionDto, { name: 'createQuestion' })
  async createQuestion(
    @Args('payload') payload: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionService.createQuestion(payload);
  }

  @Mutation((returns) => QuestionDto, {
    name: 'updateQuestion',
    nullable: true,
  })
  async updateQuestion(
    @Args('id') id: string,
    @Args('payload') payload: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionService.updateQuestion(id, payload);
  }

  @Mutation((returns) => Boolean, { name: 'deleteQuestion' })
  async deleteQuestion(@Args('id') id: string): Promise<Boolean> {
    return this.questionService.deleteQuestion(id);
  }

  @Query((returns) => [QuestionDto], { name: 'getQuestions' })
  async getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Query((returns) => QuestionDto, { name: 'getQuestionById' })
  async getQuestionById(@Args('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }
}
