import { Injectable, Logger } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Course } from './course.schema';
import { CreateCourseInput, UpdateCourseInput } from './course.dto';
import { ApolloError } from 'apollo-server-express';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CourseService {
  private readonly logger = new Logger();
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(payload: CreateCourseInput): Promise<Course> {
    const { title, code } = payload;

    if (title == '' || code == '') throw new ApolloError('Bad User Input');

    const course = await this.courseModel.findOne({ title });
    if (course) throw new ApolloError('Course already exists');

    const newCourse = new this.courseModel({
      ...payload,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await newCourse.save();
    return newCourse;
  }

  async updateCourse(id: string, payload: UpdateCourseInput): Promise<Course> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad Input');
    _id = new Types.ObjectId(id);

    return await this.courseModel.findByIdAndUpdate(_id, payload, {
      new: true,
    });
  }

  async getCourses(): Promise<Course[]> {
    return await this.courseModel.find();
  }

  async getCourseById(id: string): Promise<Course> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const course = await this.courseModel.findById(_id);
    if (!course && course?.id !== _id)
      throw new ApolloError('Course does not exist');

    return course;
  }

  async deleteCourse(id: string): Promise<Boolean> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const course = await this.courseModel.findByIdAndDelete(_id);
    if (!course && course?._id !== _id)
      throw new ApolloError('Cannot delete non-existing course');

    return true;
  }
}
