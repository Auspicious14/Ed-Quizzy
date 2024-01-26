import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URL }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
