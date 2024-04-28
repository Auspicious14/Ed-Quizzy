import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CourseService } from './course.service';
import {
  Course as CourseDto,
  CreateCourseInput,
  UpdateCourseInput,
} from './course.dto';
import { Course } from './course.schema';

@Resolver((of) => CourseDto)
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  @Mutation((returns) => CourseDto, { name: 'createCourse' })
  async createCourse(
    @Args('payload') payload: CreateCourseInput,
  ): Promise<Course> {
    return this.courseService.createCourse(payload);
  }

  @Mutation((returns) => CourseDto, { name: 'updateCourse', nullable: true })
  async updateCourse(
    @Args('id') id: string,
    @Args('payload') payload: UpdateCourseInput,
  ): Promise<Course> {
    return this.courseService.updateCourse(id, payload);
  }

  @Mutation((returns) => Boolean)
  async deleteCourse(@Args('id') id: string): Promise<Boolean> {
    return this.courseService.deleteCourse(id);
  }

  @Query((returns) => [CourseDto])
  async getCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  @Query((returns) => CourseDto)
  async getCourseById(@Args('id') id: string): Promise<Course> {
    return this.courseService.getCourseById(id);
  }

  @Query((returns) => [CourseDto])
  async getCoursesByLevel(@Args('levelId') levelId: string): Promise<Course[]> {
    return this.courseService.getCoursesByLevelId(levelId);
  }
}
