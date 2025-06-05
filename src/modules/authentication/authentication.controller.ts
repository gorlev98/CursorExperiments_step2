import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
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

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async validate(@Req() req: any) {
    return this.authService.validateToken(req.headers.authorization.split(' ')[1]);
  }
} 