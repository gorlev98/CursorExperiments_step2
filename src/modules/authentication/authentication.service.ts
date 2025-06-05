import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationRepository } from './authentication.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authRepository: AuthenticationRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async register(registerDto: { name: string; email: string; password: string }) {
    const existingUser = await this.authRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.authRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      passwordHash,
    });

    const { passwordHash: _, ...result } = user;
    return result;
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.authRepository.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { passwordHash, ...result } = user;
      return { user: result };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 