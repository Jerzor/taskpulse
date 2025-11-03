import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../user/dto/createUser.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Public()
  @Post('login')
  async login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }
}
