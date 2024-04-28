import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from './level.schema';
import { LevelResolver } from './level.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
  providers: [LevelService, LevelResolver],
  exports: [LevelService],
})
export class LevelModule {}
