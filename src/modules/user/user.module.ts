import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';

const UserMongooseModule = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
@Module({
  imports: [UserMongooseModule],
  providers: [UserService, UserResolver],
  exports: [UserService, UserMongooseModule],
})
export class UserModule {}
