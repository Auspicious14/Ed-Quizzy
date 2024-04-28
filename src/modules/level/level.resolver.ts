import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateLevelInput,
  Level as LevelDto,
  UpdateLevelInput,
} from './level.dto';
import { LevelService } from './level.service';
import { Level } from './level.schema';

@Resolver((of) => LevelDto)
export class LevelResolver {
  constructor(private levelService: LevelService) {}

  @Mutation((returns) => LevelDto, { name: 'createLevel' })
  async createLevel(
    @Args('payload') payload: CreateLevelInput,
  ): Promise<Level> {
    return await this.levelService.createlevel(payload);
  }

  @Mutation((returns) => LevelDto, { name: 'updateLevel', nullable: true })
  async updateLevel(
    @Args('id') id: string,
    @Args('payload') payload: UpdateLevelInput,
  ): Promise<Level> {
    return await this.levelService.updateLevel(id, payload);
  }

  @Mutation((returns) => Boolean, { name: 'deleteLevel', nullable: true })
  async deleteLevel(@Args('id') id: string): Promise<Boolean> {
    return await this.levelService.deleteLevel(id);
  }

  @Query((returns) => [LevelDto])
  async getLevels(): Promise<Level[]> {
    return this.levelService.getLevels();
  }
}
