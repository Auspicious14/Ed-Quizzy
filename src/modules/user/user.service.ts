import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  // private readonly user: UserDto
  private readonly UserModel: Model<User>;

  async createUser(user: User): Promise<User> {
    const { password, ...data } = user;

    const existingUser = await this.UserModel.findOne({ email: user.email });
    if (existingUser) throw new ConflictException('User Already Exist');

    const hashedPassword = argon2.hash(password);
    const newUser = new this.UserModel({
      ...data,
      password: hashedPassword,
      createdAt: Date.now(),
      updated: Date.now(),
    });

    return newUser.save();
  }

  async updateUser(id: string, user: User): Promise<User> {
    await this.UserModel.updateOne(
      { _id: id },
      { ...user, updatedAt: Date.now() },
    );
    return;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.UserModel.find();
    return users;
  }

  async findOneUser(id: string): Promise<User> {
    let userId;
    if (id) userId = new Types.ObjectId(id);

    const user = await this.UserModel.findById(userId);

    return user;
  }
}
