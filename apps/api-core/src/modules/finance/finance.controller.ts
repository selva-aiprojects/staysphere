import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FinanceService } from './finance.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Finance, Split-Payment & Double-Entry Ledger (FINANCE)')
@Controller('finance')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('ledger')
  @Roles('SUPER_ADMIN', 'OPS_ADMIN')
  @ApiOperation({ summary: 'Audit double-entry ledger balances, escrow pools & platform take rates' })
  async getLedgerSummary() {
    return this.financeService.getLedgerSummary();
  }
}
