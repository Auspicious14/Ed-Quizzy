import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Level } from './level.schema';
import { Model, Types } from 'mongoose';
import { ApolloError } from 'apollo-server-express';
import { CreateLevelInput, UpdateLevelInput } from './level.dto';

@Injectable()
export class LevelService {
  private readonly logger: Logger;

  constructor(@InjectModel(Level.name) private levelModel: Model<Level>) {}

  async createlevel(payload: CreateLevelInput): Promise<Level> {
    const { level } = payload;
    if (level == '') throw new ApolloError('Bad User Input');

    const existingLevel = await this.levelModel.findOne({ level });
    if (existingLevel) throw new ApolloError('Level already exists');

    const newLevel = new this.levelModel({ level });
    await newLevel.save();

    return newLevel;
  }

  async updateLevel(id: string, payload: UpdateLevelInput): Promise<Level> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    return await this.levelModel.findByIdAndUpdate(_id, payload, {
      new: true,
    });
  }

  async getLevels(): Promise<Level[]> {
    return await this.levelModel.find();
  }

  async deleteLevel(id: string): Promise<Boolean> {
    let _id: Types.ObjectId;

    if (!id || id == '') throw new ApolloError('Bad User Input');
    _id = new Types.ObjectId(id);

    const level = await this.levelModel.findByIdAndDelete(_id);
    if (!level || level?._id?.toString() !== _id.toString())
      throw new ApolloError('Cannot delete non-existing level');

    return true;
  }
}
