import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './resource.schema';
import { JwtStrategy } from '../auth/guard/jwt.strategy';
import { ResourceResolver } from './resource.resolver';
import { ResourceService } from './resource.service';
import { AuthModule } from '../auth/auth.module';
import { QuizService } from '../quiz/quiz.service';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
    ]),
    AuthModule,
    QuizModule,
  ],
  providers: [JwtStrategy, ResourceResolver, ResourceService],
  exports: [ResourceResolver],
})
export class ResourceModule {}
