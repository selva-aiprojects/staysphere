import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MyStayService } from './my-stay.service';
import {
  CreateServiceRequestSchema,
  UpdateServiceRequestStatusSchema,
} from '@staysphere/validation-schemas';

@ApiTags('In-Stay Guest Management (MY STAY)')
@Controller('my-stay')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MyStayController {
  constructor(private readonly myStayService: MyStayService) {}

  @Get(':bookingId')
  @ApiOperation({ summary: 'Retrieve full in-stay guest portal timeline, amenities & request status' })
  async getInStayDetails(@Req() req: any, @Param('bookingId') bookingId: string) {
    return this.myStayService.getInStayDetails(req.user.id, bookingId);
  }

  @Post('requests')
  @ApiOperation({ summary: 'Submit an in-stay digital service request (Housekeeping, F&B, Maintenance)' })
  async createRequest(@Req() req: any, @Body() rawBody: unknown) {
    const validated = CreateServiceRequestSchema.parse(rawBody);
    return this.myStayService.createServiceRequest(req.user.id, validated);
  }

  @Patch('requests/:requestId/status')
  @ApiOperation({ summary: 'Hotel Front Desk updates in-stay request status or acknowledges fulfillment' })
  async updateStatus(@Param('requestId') requestId: string, @Body() rawBody: unknown) {
    const validated = UpdateServiceRequestStatusSchema.parse(rawBody);
    return this.myStayService.updateServiceRequestStatus(requestId, validated);
  }
}
