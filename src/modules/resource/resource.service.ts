import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './resource.schema';
import { Model } from 'mongoose';
import { ResourceInput } from './resource.dto';
import { QuizService } from '../quiz/quiz.service';
import { ApolloError } from 'apollo-server-express';
import { generativeAI } from 'src/utils/utils';
import { EnhancedGenerateContentResponse } from '@google/generative-ai';
import { User } from '../user/user.schema';
import { JwtAuthGuard } from '../auth/guard/guard';
import { CurrentUser } from '../auth/guard/current.user';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<Resource>,
    private quizService: QuizService,
  ) {}

  @UseGuards(JwtAuthGuard)
  async generateResource(
    @CurrentUser() user: User,
    payload: ResourceInput,
  ): Promise<Resource> {
    if (!user) throw new UnauthorizedException();

    const quiz = await this.quizService.getQuizById(payload.quizId);

    if (!quiz) throw new ApolloError('No quiz found');

    const prompt = `Resources relating to '${quiz.name}' topic. 
    Return results in JSON format: {urls: []}.`;

    const response: EnhancedGenerateContentResponse =
      await generativeAI(prompt);
    const data = response.text();
    console.log(data, 'api resss');

    if (data) {
      const startIndex = data.indexOf('{');
      const lastIndex = data.lastIndexOf('}') + 1;
      const modifiedResponse = data.substring(startIndex, lastIndex);

      console.log(modifiedResponse, 'modified response');
      // const resource =  this.resourceModel.create({
      //     quizName: quiz.name,
      //   urls: modifiedResponse
      // })
    }
    return;
  }
}
