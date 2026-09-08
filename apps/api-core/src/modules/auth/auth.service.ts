import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '@staysphere/database';
import * as bcrypt from 'bcrypt';
import { LoginRequest, RegisterRequest } from '@staysphere/validation-schemas';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(dto: RegisterRequest) {
    const existing = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('An account with this email address already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        fullName: dto.fullName,
        phone: dto.phone,
        role: dto.role as any,
        isVerified: true,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        isActive: true,
        createdAt: true,
      },
    });

    const accessToken = this.generateToken(user.id, user.email, user.role);

    return {
      user,
      accessToken,
    };
  }

  async login(dto: LoginRequest) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password credentials');
    }

    const accessToken = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
      },
      accessToken,
    };
  }

  private generateToken(userId: string, email: string, role: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
    });
  }
}
