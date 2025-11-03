import { PrismaService } from '../prisma/prisma.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const user = this.prisma.user.create({
      data: {
        email: userDto.email,
        password: hashedPassword,
      },
    });

    this.eventEmitter.emit('user.registered', user);

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
