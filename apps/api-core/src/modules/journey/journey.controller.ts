import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JourneyService } from './journey.service';

export class ProactiveResolutionDto {
  journeyReference!: string;
  category!: string;
  description!: string;
  severity?: 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';
}

export class AdvanceStageDto {
  targetStage!: string;
}

export class CancelJourneyDto {
  reason!: string;
}

export class RedispatchStandbyDto {
  newPartnerName?: string;
}

export class CreateJourneyDto {
  guestName!: string;
  guestEmail!: string;
  guestPhone!: string;
  vipTier?: 'SOVEREIGN_PLATINUM' | 'GOLD_EXECUTIVE' | 'CLASSIC';
  propertyName!: string;
  roomType!: string;
  checkInDate!: string;
  checkOutDate!: string;
  nights!: number;
  stayAmount!: number;
  transitVehicle?: string;
  transitAmount?: number;
  pickupLocation?: string;
  dropLocation?: string;
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

  @Post()
  @ApiOperation({ summary: 'Create and orchestrate a new atomic 3-in-1 StaySphere journey' })
  async createJourney(@Body() body: CreateJourneyDto) {
    return this.journeyService.createJourney(body);
  }

  @Patch(':reference/stage')
  @ApiOperation({ summary: 'Advance active journey lifecycle stage' })
  async advanceStage(
    @Param('reference') reference: string,
    @Body() body: AdvanceStageDto,
  ) {
    return this.journeyService.advanceJourneyStage(reference, body.targetStage);
  }

  @Post(':reference/cancel')
  @ApiOperation({ summary: 'Trigger cascading cancellation across Stay and Transit components' })
  async cancelJourney(
    @Param('reference') reference: string,
    @Body() body: CancelJourneyDto,
  ) {
    return this.journeyService.cancelJourneyCascade(reference, body.reason || 'Guest requested cancellation');
  }

  @Post(':reference/redispatch-standby')
  @ApiOperation({ summary: 'Emergency re-dispatch standby transport partner with zero guest disruption' })
  async redispatchStandby(
    @Param('reference') reference: string,
    @Body() body: RedispatchStandbyDto,
  ) {
    return this.journeyService.redispatchStandbyTransit(reference, body.newPartnerName);
  }

  @Post(':reference/resolve')
  @ApiOperation({ summary: 'Submit a proactive resolution or service recovery request for an active journey' })
  async submitResolution(
    @Param('reference') reference: string,
    @Body() body: ProactiveResolutionDto,
  ) {
    return this.journeyService.submitProactiveResolution({
      journeyReference: reference,
      category: body.category || 'GENERAL_INQUIRY',
      description: body.description,
      severity: body.severity,
    });
  }
}

