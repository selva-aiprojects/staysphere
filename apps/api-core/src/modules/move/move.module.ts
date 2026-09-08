import { Module } from '@nestjs/common';
import { MoveService } from './move.service';
import { MoveController } from './move.controller';

@Module({
  controllers: [MoveController],
  providers: [MoveService],
  exports: [MoveService],
})
export class MoveModule {}
