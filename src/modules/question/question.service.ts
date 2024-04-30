import { Inject, Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from './question.schema';
import { CreateQuestionInput, UpdateQuestionInput } from './question.dto';
import { ApolloError } from 'apollo-server-express';
import { CourseService } from '../course/course.service';
import { QuizService } from '../quiz/quiz.service';
import { generativeAI } from 'src/utils/utils';
import { CACHE_MANAGER, Cache, CacheInterceptor } from '@nestjs/cache-manager';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class QuestionService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private courseService: CourseService,
    private quizService: QuizService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async createQuestion(payload: CreateQuestionInput): Promise<Question> {
    const { question, quizId } = payload;

    const quiz = await this.quizService.getQuizById(quizId);
    if (!quiz)
      throw new ApolloError('Cannot create question: Quiz does not exist');

    const course = await this.courseService.getCourseById(quiz.courseId);
    if (!course) throw new ApolloError('Course does not exist');

    const existingQuestion = await this.questionModel.findOne({ question });
    if (existingQuestion) throw new ApolloError('Question already exists');

    const newQuestion = new this.questionModel({
      ...payload,
      courseId: course?._id,
      course: {
        _id: course?._id,
        title: course?.title,
        level: course?.level,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

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

    if (!question || question._id.toString() !== _id.toString())
      throw new ApolloError('Cannot delete non-existing question');

    return true;
  }

  async deleteQuestions(): Promise<Boolean> {
    const question = await this.questionModel.deleteMany();

    if (!question)
      throw new ApolloError('Cannot delete non-existing questions');

    return true;
  }

  async getQuestions(): Promise<Question[]> {
    return this.questionModel.find();
  }

  async getQuestionByCourse(courseId: string): Promise<Question[]> {
    return this.questionModel.find({ courseId });
  }

  async getQuestionByQuiz(quizId: string): Promise<Question[]> {
    let questions: Array<Question> = [];
    const cachedKey = `questions:${quizId}`;
    const cachedData: Array<Question> = await this.cache.get(cachedKey);

    if (!cachedData || cachedData == undefined) {
      questions = await this.questionModel.find({ quizId });
      await this.cache.set(cachedKey, questions, 30 * 60 * 60 * 1000);
    } else {
      questions = cachedData;
    }
    return questions;
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

  async generateQuestions(payload: CreateQuestionInput): Promise<any[]> {
    let { quizId } = payload;
    const cachedKey = `questions:${quizId}`;

    const quiz = await this.quizService.getQuizById(quizId);

    const course = await this.courseService.getCourseById(quiz.courseId);
    if (!course) throw new ApolloError('Course does not exist');

    if (!quiz) throw new ApolloError('Invalid Param');

    const prompt = `Generate questions based on ${quiz?.name} 
    Make sure you return a valid and structured JSON object 
    as your response as an array of 
    {question: "", options: [], answer: "" }. Generate 20 sets of questions`;

    const data = await generativeAI(prompt);
    const response = data.text();
    console.log(response, 'resss');

    const startIndex = response.indexOf('[');
    const endIndex = response.lastIndexOf(']') + 1;
    const modifiedResponse = response.substring(startIndex, endIndex);

    const parsedQuestions = JSON.parse(modifiedResponse);
    const mappedValues = parsedQuestions.map((q) => ({
      ...q,
      quizId,
      courseId: course?._id,
      course: {
        _id: course?._id,
        title: course?.title,
        level: course?.level,
      },
    }));
    const questions = await this.questionModel.insertMany(mappedValues);

    return questions;
  }
}
