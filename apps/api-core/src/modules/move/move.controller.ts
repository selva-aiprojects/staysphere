import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MoveService } from './move.service';
import {
  RequestTransitQuoteSchema,
  CreateTransitBookingSchema,
  UpdateDriverLocationSchema,
} from '@staysphere/validation-schemas';

@ApiTags('Travel Desk & Mobility (MOVE)')
@Controller('move')
export class MoveController {
  constructor(private readonly moveService: MoveService) {}

  @Post('quotes')
  @ApiOperation({ summary: 'Calculate verified transit fare and duration quote' })
  async getQuote(@Body() rawBody: unknown) {
    const validated = RequestTransitQuoteSchema.parse(rawBody);
    return this.moveService.calculateQuote(validated);
  }

  @Post('bookings')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Book guaranteed airport, outstation, or local city transfer' })
  async createBooking(@Req() req: any, @Body() rawBody: unknown) {
    const validated = CreateTransitBookingSchema.parse(rawBody);
    return this.moveService.createTransitBooking(req.user.id, validated);
  }

  @Post('driver/location')
  @ApiOperation({ summary: 'Ingest live driver GPS coordinate telemetry' })
  async updateLocation(@Body() rawBody: unknown) {
    const validated = UpdateDriverLocationSchema.parse(rawBody);
    return this.moveService.updateDriverLocation(validated);
  }
}
