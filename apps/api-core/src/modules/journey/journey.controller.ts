import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JourneyService } from './journey.service';

export class ProactiveResolutionDto {
  journeyReference!: string;
  category!: string;
  description!: string;
  severity?: 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';
}

@ApiTags('Journey Orchestration & Telemetry')
@Controller('api/v1/journeys')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Get('active')
  @ApiOperation({ summary: 'List all live active guest journeys with real-time telemetry and coupled bookings' })
  async getActiveJourneys() {
    return this.journeyService.getActiveJourneys();
  }

  @Get(':reference')
  @ApiOperation({ summary: 'Get complete 360-degree journey drill-down by reference code' })
  async getJourneyByReference(@Param('reference') reference: string) {
    return this.journeyService.getJourneyByReference(reference);
  }

  @Post(':reference/resolve')
  @ApiOperation({ summary: 'Submit a proactive resolution or service recovery request for an active journey' })
  async submitResolution(
    @Param('reference') reference: string,
    @Body() body: ProactiveResolutionDto
  ) {
    return this.journeyService.submitProactiveResolution({
      journeyReference: reference,
      category: body.category || 'GENERAL_INQUIRY',
      description: body.description,
      severity: body.severity,
    });
  }
}
