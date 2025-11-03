import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) throw new BadRequestException('User already exists');

    const user = await this.userService.create(userDto);
    const token = await this.generateToken(user.id, user.email);

    return { token };
  }

  async login(userDto: LoginDto) {
    const user = await this.userService.findByEmail(userDto.email);
    if (!user) throw new NotFoundException('User does not exist');

    const isValidPassword = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    const token = await this.generateToken(user.id, user.email);

    return { token };
  }

  private generateToken(id: string, email: string) {
    return this.jwtService.signAsync({ sub: id, email });
  }
}
