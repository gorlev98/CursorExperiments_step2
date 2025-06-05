import { Controller, Post, Body, UnauthorizedException, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: { email: string; password: string }) {
    const result = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(result);
  }

  @Post('register')
  async register(@Body() registerDto: { name: string; email: string; password: string }) {
    return this.authService.register(registerDto);
  }
} 