import { Controller, Get, Post, Patch, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResolutionService } from './resolution.service';
import { CreateTicketSchema, UpdateTicketStatusSchema } from '@staysphere/validation-schemas';

@ApiTags('Unified Ticketing & SLA Resolution Desk (RESOLVE)')
@Controller('resolution')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService) {}

  @Get('tickets')
  @ApiOperation({ summary: 'List all open/escalated tickets in the Control Tower queue' })
  async getTickets(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('limit') limit?: number,
  ) {
    return this.resolutionService.getTickets({ status, priority, limit: limit ? Number(limit) : 50 });
  }

  @Post('tickets')
  @ApiOperation({ summary: 'Open a new issue ticket across Stay, Move, or Billing' })
  async createTicket(@Req() req: any, @Body() rawBody: unknown) {
    const validated = CreateTicketSchema.parse(rawBody);
    return this.resolutionService.createTicket(req.user.id, validated);
  }

  @Patch('tickets/:ticketId')
  @ApiOperation({ summary: 'Resolution Agent updates ticket status, proposes settlement or triggers refund' })
  async updateTicket(@Param('ticketId') ticketId: string, @Body() rawBody: unknown) {
    const validated = UpdateTicketStatusSchema.parse(rawBody);
    return this.resolutionService.updateTicket(ticketId, validated);
  }
}
