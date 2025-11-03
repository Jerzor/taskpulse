import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/createUser.dto.js';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
