import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestSchema, RegisterRequestSchema } from '@staysphere/validation-schemas';

@ApiTags('Authentication & Identity')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new participant (Guest, Hotel Staff, Driver, Partner)' })
  @ApiResponse({ status: 201, description: 'User account created and JWT issued' })
  async register(@Body() rawBody: unknown) {
    const validated = RegisterRequestSchema.parse(rawBody);
    return this.authService.register(validated);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and receive JWT session' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  async login(@Body() rawBody: unknown) {
    const validated = LoginRequestSchema.parse(rawBody);
    return this.authService.login(validated);
  }
}
