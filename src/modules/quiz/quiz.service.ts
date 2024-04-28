import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quiz } from './quiz.schema';
import { CreateQuizInput, UpdateQuizInput } from './quiz.dto';
import { ApolloError } from 'apollo-server-express';
import { CourseService } from '../course/course.service';
import { generativeAI, mapFiles } from 'src/utils/utils';

@Injectable()
export class QuizService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    private courseService: CourseService,
  ) {}

  async createQuiz(payload: CreateQuizInput): Promise<Quiz> {
    let files: Array<{}> = [{}];
    const { name, courseId, images } = payload;

    const course = await this.courseService.getCourseById(courseId);
    if (!course) throw new ApolloError('Course does not exist');

    const existingQuiz = await this.quizModel.findOne({ name });
    if (existingQuiz) throw new ApolloError('Quiz already exists');

    if (images) {
      files = await mapFiles(images);
    }

    const newQuiz = new this.quizModel({
      ...payload,
      level: course?.level,
      images: files,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await newQuiz.save();
  }

  async updateQuiz(id: string, payload: UpdateQuizInput): Promise<Quiz> {
    let files: Array<{}> = [{}];
    let _id: Types.ObjectId;
    const { images } = payload;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    if (images) {
      files = await mapFiles(images);
    }

    return await this.quizModel.findByIdAndUpdate(
      _id,
      { ...payload, images: files },
      {
        new: true,
      },
    );
  }

  async deleteQuiz(id: string): Promise<Boolean> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const question = await this.quizModel.findByIdAndDelete(_id);

    if (!question || question._id.toString() !== _id.toString())
      throw new ApolloError('Cannot delete non-existing question');

    return true;
  }

  async getQuizes(): Promise<Quiz[]> {
    return this.quizModel.find();
  }

  async getQuizByCourse(courseId: string): Promise<Quiz[]> {
    return this.quizModel.find({ courseId });
  }

  async getQuizById(id: string): Promise<Quiz> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const question = await this.quizModel.findById(_id);
    if (!question || question._id.toString() !== _id.toString())
      throw new ApolloError('Quiz does not exist');

    return question;
  }

  async generateQuiz(courseTitle: string, courseId: string): Promise<Quiz> {
    let payload;
    const course = await this.courseService.getCourseById(courseId);
    if (!course) throw new ApolloError('Course does not exist');

    const prompt = `create a quiz name, description that matches ${courseTitle}. Make sure you return a valid and structured JSOON object of name and description as your response {name: "", description: ""}.`;
    const data = await generativeAI(prompt);
    const response = data.text();

    const startIndex = response.indexOf('{');
    const endIndex = response.indexOf('}') + 1;
    const modifiedResponse = response.substring(startIndex, endIndex);

    payload = JSON.parse(modifiedResponse);

    const result = new this.quizModel({
      courseId,
      name: payload.name,
      description: payload.description,
    });
    result.save();

    if (!result) throw new ApolloError('Error creating quiz');

    return result;
  }
}
