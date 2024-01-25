import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, UserDto } from './user.dto';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  // private readonly user: UserDto
  // private readonly UserModel: Model<User>;
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async createUser(user: CreateUserInput): Promise<User> {
    const { password, ...data } = user;

    const existingUser = await this.UserModel.findOne({ email: user.email });
    if (existingUser) throw new ConflictException('User Already Exist');

    const hashedPassword = await argon2.hash(password);
    const newUser = new this.UserModel({
      ...data,
      password: hashedPassword,
      createdAt: Date.now(),
      updated: Date.now(),
    });

    return newUser.save();
  }

  async updateUser(id: string, user: UpdateUserInput): Promise<User> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: id },
      { ...user, updatedAt: Date.now() },
      { new: true },
    );
  }

  async getUsers(): Promise<User[]> {
    const users = await this.UserModel.find().exec();
    return users;
  }

  async findOneUser(id: string): Promise<User> {
    let userId;
    if (id) userId = new Types.ObjectId(id);

    const user = await this.UserModel.findById(userId);

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
