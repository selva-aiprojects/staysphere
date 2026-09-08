import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { StayModule } from './modules/stay/stay.module';
import { MoveModule } from './modules/move/move.module';
import { MyStayModule } from './modules/my-stay/my-stay.module';
import { ResolutionModule } from './modules/resolution/resolution.module';
import { FinanceModule } from './modules/finance/finance.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    StayModule,
    MoveModule,
    MyStayModule,
    ResolutionModule,
    FinanceModule,
  ],
})
export class AppModule {}
