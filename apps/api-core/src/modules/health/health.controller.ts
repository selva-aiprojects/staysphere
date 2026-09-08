import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health & Readiness')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Platform Liveness & Ecosystem Health Probe' })
  @ApiResponse({ status: 200, description: 'All core subsystems operational' })
  check() {
    return {
      status: 'UP',
      product: 'StaySphere Platform',
      version: '3.0.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      domains: {
        stay: 'OPERATIONAL',
        move: 'OPERATIONAL',
        myStay: 'OPERATIONAL',
        resolution: 'OPERATIONAL',
        finance: 'OPERATIONAL',
      },
    };
  }
}
