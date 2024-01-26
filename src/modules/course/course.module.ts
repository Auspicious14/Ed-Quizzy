import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  providers: [CourseService, CourseResolver],
})
export class CourseModule {}
