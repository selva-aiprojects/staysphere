import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FinanceService } from './finance.service';

export class ReleaseEscrowDto {
  journeyReference!: string;
  milestoneType!: 'CURBSIDE_PICKUP_HANDSHAKE' | 'SUITE_CHECK_IN_CONFIRMATION' | 'CHECK_OUT_INSPECTION';
  targetParty!: 'HOTEL_OPERATOR' | 'TRAVEL_OPERATOR';
  amount!: number;
  platformCommissionPct?: number;
}

@ApiTags('Finance, Split-Payment & Double-Entry Ledger (FINANCE)')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('ledger')
  @ApiOperation({ summary: 'Audit double-entry ledger balances, escrow pools & platform take rates' })
  async getLedgerSummary() {
    return this.financeService.getLedgerSummary();
  }

  @Post('escrow/release-milestone')
  @ApiOperation({ summary: 'Disburse escrow milestone and write double-entry balanced journal entries' })
  async releaseEscrowMilestone(@Body() body: ReleaseEscrowDto) {
    return this.financeService.releaseEscrowMilestone(body);
  }
}

