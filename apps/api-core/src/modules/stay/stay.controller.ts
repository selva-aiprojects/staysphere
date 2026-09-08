import { Controller, Get, Post, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StayService } from './stay.service';
import { SearchHotelsQuerySchema, CreateStayBookingSchema } from '@staysphere/validation-schemas';

@ApiTags('Property Marketplace & Booking (STAY)')
@Controller('stay')
export class StayController {
  constructor(private readonly stayService: StayService) {}

  @Get('properties')
  @ApiOperation({ summary: 'Search and filter verified accommodation properties' })
  async search(@Query() rawQuery: unknown) {
    const validated = SearchHotelsQuerySchema.parse(rawQuery);
    return this.stayService.searchProperties(validated);
  }

  @Get('properties/:slug')
  @ApiOperation({ summary: 'Retrieve full property details, room configurations & rate plans' })
  async getBySlug(@Param('slug') slug: string) {
    return this.stayService.getPropertyBySlug(slug);
  }

  @Post('bookings')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create and confirm a verified stay booking with ledger transaction' })
  async createBooking(@Req() req: any, @Body() rawBody: unknown) {
    const validated = CreateStayBookingSchema.parse(rawBody);
    return this.stayService.createBooking(req.user.id, validated);
  }
}
