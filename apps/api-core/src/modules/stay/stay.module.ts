import { Module } from '@nestjs/common';
import { StayService } from './stay.service';
import { StayController } from './stay.controller';

@Module({
  controllers: [StayController],
  providers: [StayService],
  exports: [StayService],
})
export class StayModule {}
