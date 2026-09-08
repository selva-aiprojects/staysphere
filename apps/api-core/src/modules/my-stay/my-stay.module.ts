import { Module } from '@nestjs/common';
import { MyStayService } from './my-stay.service';
import { MyStayController } from './my-stay.controller';

@Module({
  controllers: [MyStayController],
  providers: [MyStayService],
  exports: [MyStayService],
})
export class MyStayModule {}
