import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from './question.schema';
import { CreateQuestionInput, UpdateQuestionInput } from './question.dto';
import { ApolloError } from 'apollo-server-express';
import { CourseService } from '../course/course.service';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private courseService: CourseService,
  ) {}

  async createQuestion(payload: CreateQuestionInput): Promise<Question> {
    const { question, courseId } = payload;

    const course = await this.courseService.getCourseById(courseId);
    this.logger.log(course, 'cccoursee');
    if (!course) throw new ApolloError('Course does not exist');

    const existingQuestion = await this.questionModel.findOne({ question });
    if (existingQuestion) throw new ApolloError('Question already exists');

    const newQuestion = new this.questionModel({
      ...payload,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.logger.log(newQuestion);
    return await newQuestion.save();
  }

  async updateQuestion(
    id: string,
    payload: UpdateQuestionInput,
  ): Promise<Question> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    return await this.questionModel.findByIdAndUpdate(_id, payload, {
      new: true,
    });
  }

  async deleteQuestion(id: string): Promise<Boolean> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const question = await this.questionModel.findByIdAndDelete(_id);

    if (!question || question._id.toString() != _id.toString())
      throw new ApolloError('Cannot delete non-existing question');

    return true;
  }

  async getQuestions(): Promise<Question[]> {
    return this.questionModel.find();
  }

  async getQuestionById(id: string): Promise<Question> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const question = await this.questionModel.findById(_id);
    if (!question || question._id.toString() !== _id.toString())
      throw new ApolloError('Question does not exist');

    return question;
  }
}
