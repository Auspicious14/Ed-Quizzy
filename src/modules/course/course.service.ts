import { Injectable, Logger } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Course } from './course.schema';
import { CreateCourseInput, UpdateCourseInput } from './course.dto';
import { ApolloError } from 'apollo-server-express';
import { InjectModel } from '@nestjs/mongoose';
import { mapFiles } from 'src/utils/utils';

@Injectable()
export class CourseService {
  private readonly logger = new Logger();
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(payload: CreateCourseInput): Promise<Course> {
    const { title, code, level, levelId, images } = payload;

    if (title == '' || code == '' || level == '' || levelId == '')
      throw new ApolloError('Bad User Input');

    if (!levelId) throw new ApolloError('Add Level ID to create a new course');

    const exisCourseTitle = await this.courseModel.findOne({ title });
    if (exisCourseTitle) throw new ApolloError('Course title already exists');

    const exisCourseCode = await this.courseModel.findOne({ code });
    if (exisCourseCode) throw new ApolloError('Course code already exists');
    const files = await mapFiles(images);

    const newCourse = new this.courseModel({
      ...payload,
      images: files,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await newCourse.save();
    return newCourse;
  }

  async updateCourse(id: string, payload: UpdateCourseInput): Promise<Course> {
    const { images, ...values } = payload;
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const files = await mapFiles(images);

    return await this.courseModel.findByIdAndUpdate(
      _id,
      { images: files, ...values },
      {
        new: true,
      },
    );
  }

  async getCourses(): Promise<Course[]> {
    return await this.courseModel.find();
  }

  async getCourseById(id: string): Promise<Course> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const course = await this.courseModel.findById(_id);

    if (!course || course?._id?.toString() !== _id.toString())
      throw new ApolloError('Course does not exist');

    return course;
  }

  async getCoursesByLevelId(levelId: string): Promise<Course[]> {
    return await this.courseModel.find({ levelId });
  }

  async deleteCourse(id: string): Promise<Boolean> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const course = await this.courseModel.findByIdAndDelete(_id);
    if (!course || course?._id?.toString() !== _id.toString())
      throw new ApolloError('Cannot delete non-existing course');

    return true;
  }
}
